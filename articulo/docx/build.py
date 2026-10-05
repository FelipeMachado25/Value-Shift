"""Construye el DOCX en dos pasadas para que el índice lleve números de página reales.

1. Genera el DOCX con el índice precargado (sin números).
2. Lo convierte a PDF con LibreOffice (fuente Carlito = métricas de Calibri) y localiza la página
   de cada título y de cada leyenda de tabla o figura.
3. Regenera el DOCX con esos números y comprueba que la paginación no cambió.
4. Cambia el estilo de las entradas del índice de tablas y figuras a "TableofFigures" y valida.

Uso: python3 build.py <ruta a scripts/ de la skill docx>
"""
import json, os, re, shutil, subprocess, sys, tempfile, unicodedata, zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
SKILL = sys.argv[1]
DOCX = os.path.join(HERE, "Value_Shift_marco_teorico.docx")
ENV = dict(os.environ, NODE_PATH="/usr/local/lib/node_modules_global")


def node_build():
    subprocess.run(["node", "build_docx.js"], cwd=HERE, env=ENV, check=True)


def to_pdf(src):
    out = tempfile.mkdtemp(prefix="vs_pdf_")
    subprocess.run([sys.executable, os.path.join(SKILL, "office", "soffice.py"), "--headless",
                    "--convert-to", "pdf", "--outdir", out, src], check=True,
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return os.path.join(out, os.path.splitext(os.path.basename(src))[0] + ".pdf")


def norm(s):
    s = unicodedata.normalize("NFKC", s).replace("‑", "-")
    return re.sub(r"\s+", " ", s).strip().lower()


def pages_text(pdf):
    n = int(re.search(r"Pages:\s+(\d+)", subprocess.run(["pdfinfo", pdf], capture_output=True, text=True).stdout).group(1))
    txt = subprocess.run(["pdftotext", pdf, "-"], capture_output=True, text=True).stdout
    pages = txt.split("\f")[:n]
    return [norm(p) for p in pages]


def locate(entries, pages, start):
    out, cur = [], start
    for e in entries:
        key = norm(e["title"])[:38]
        found = None
        for k in range(cur, len(pages)):
            if key in pages[k]:
                found = k
                break
        if found is None:
            out.append("")
            continue
        out.append(found + 1)
        cur = found
    return out


def compute_pages():
    pdf = to_pdf(DOCX)
    pages = pages_text(pdf)
    entries = json.load(open(os.path.join(HERE, "toc_entries.json")))
    # el cuerpo empieza después del índice de tablas y figuras
    start = next(k for k, p in enumerate(pages) if p.startswith("value shift") and "índice de tablas y figuras" in p[:120]) + 1
    toc = locate(entries["toc"], pages, start)
    tof = locate(entries["tof"], pages, start)
    return {"toc": toc, "tof": tof, "n": len(pages)}


def patch_tof_style(path):
    tmp = path + ".tmp"
    with zipfile.ZipFile(path) as zin, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename == "word/document.xml":
                xml = data.decode("utf8")
                # segundo bloque sdt = índice de tablas y figuras
                parts = xml.split("<w:sdt>")
                if len(parts) >= 3:
                    parts[2] = parts[2].replace('<w:pStyle w:val="Caption"/>', '<w:pStyle w:val="TableofFigures"/>')
                xml = "<w:sdt>".join(parts)
                # ids únicos para los marcadores (docx-js los numera todos igual)
                stack, counter = [], [0]
                def fix(m):
                    if m.group(1) == "Start":
                        counter[0] += 1
                        stack.append(counter[0])
                        return m.group(0).replace(f'w:id="{m.group(2)}"', f'w:id="{counter[0]}"')
                    return m.group(0).replace(f'w:id="{m.group(2)}"', f'w:id="{stack.pop()}"')
                xml = re.sub(r'<w:bookmark(Start|End)\b[^>]*?w:id="(\d+)"[^>]*/>', fix, xml)
                data = xml.encode("utf8")
            zout.writestr(item, data)
    shutil.move(tmp, path)


if __name__ == "__main__":
    pj = os.path.join(HERE, "toc_pages.json")
    if os.path.exists(pj):
        os.remove(pj)
    node_build()
    p1 = compute_pages()
    json.dump(p1, open(pj, "w"))
    node_build()
    p2 = compute_pages()
    if p2["toc"] != p1["toc"] or p2["tof"] != p1["tof"]:
        json.dump(p2, open(pj, "w"))
        node_build()
        p3 = compute_pages()
        print("tercera pasada; estable:", p3["toc"] == p2["toc"] and p3["tof"] == p2["tof"])
    missing = [e for e, p in zip(json.load(open(os.path.join(HERE, "toc_entries.json")))["toc"], p2["toc"]) if p == ""]
    print("páginas:", p2["n"], "| entradas sin página:", len(missing), [m["title"] for m in missing][:5])
    patch_tof_style(DOCX)
    r = subprocess.run([sys.executable, os.path.join(SKILL, "office", "validate.py"), DOCX], capture_output=True, text=True, cwd=SKILL)
    print(r.stdout.strip().splitlines()[-1] if r.stdout.strip() else r.stderr[-500:])
