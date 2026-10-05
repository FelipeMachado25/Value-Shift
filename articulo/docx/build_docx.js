// Genera Value_Shift_marco_teorico.docx a partir de los Markdown del proyecto.
// Uso: node build_docx.js   (desde articulo/docx)
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, ImageRun, ExternalHyperlink, TableOfContents, StyleLevel,
  PageBreak, Header, Footer, PageNumber, LevelFormat, TabStopType, VerticalAlign, PageOrientation, Bookmark,
} = require("docx");

const ROOT = path.resolve(__dirname, "..");
const FIG = path.join(ROOT, "figuras");
const OUT = path.join(__dirname, "Value_Shift_marco_teorico.docx");

// ---------- Diseño ----------
const FONT = "Calibri";
const BODY_PT = 11;
const COLOR_H = "1F3864";
const COLOR_ACCENT = "2A78D6";
const COLOR_MUTED = "52514E";
const PAGE_W = 11906, PAGE_H = 16838, MARGIN = 1418; // A4, 2,5 cm
const CONTENT_W = PAGE_W - 2 * MARGIN; // 9070 DXA
const LAND_W = PAGE_H - 2 * MARGIN; // 14002 DXA
const PX_PER_DXA = 96 / 1440;
const MAX_IMG_PX = Math.floor(CONTENT_W * PX_PER_DXA); // ≈605 px

// ---------- Inline Markdown ----------
const ESC = "\u0001";
function inlineRuns(text, base = {}) {
  text = text.replace(/\\\*/g, ESC);
  const runs = [];
  const re = /(\*\*(.+?)\*\*)|(\*(?!\s)([^*]+?)\*)|(`([^`]+)`)|(https?:\/\/[^\s<>\]|]+)/g;
  let last = 0, m;
  const push = (t, extra = {}) => {
    if (!t) return;
    runs.push(new TextRun({ text: t.split(ESC).join("*"), ...base, ...extra }));
  };
  while ((m = re.exec(text)) !== null) {
    push(text.slice(last, m.index));
    if (m[1]) {
      // negrita, con posible cursiva interna
      for (const r of inlineRuns(m[2], { ...base, bold: true })) runs.push(r);
    } else if (m[3]) {
      for (const r of inlineRuns(m[4], { ...base, italics: true })) runs.push(r);
    } else if (m[5]) {
      push(m[6], { font: "Consolas", size: Math.round((base.size || BODY_PT * 2) * 0.9) });
    } else if (m[7]) {
      let url = m[7];
      let trail = "";
      // recorta puntuación final y paréntesis no balanceados
      while (/[.,;:]$/.test(url) || (url.endsWith(")") && (url.split("(").length < url.split(")").length))) {
        trail = url.slice(-1) + trail;
        url = url.slice(0, -1);
      }
      runs.push(new ExternalHyperlink({
        link: url.split(ESC).join("*"),
        children: [new TextRun({ text: url.split(ESC).join("*"), style: "Hyperlink", ...base, color: COLOR_ACCENT, underline: {} })],
      }));
      if (trail) push(trail);
    }
    last = re.lastIndex;
  }
  push(text.slice(last));
  return runs;
}

// ---------- Bloques ----------
let figCounter = 0; // para bloques Mermaid
const MERMAID_FIGS = [
  { file: "fig1_linea_tiempo_vertical.png", maxW: 560 },
  { file: "fig2_modelo_conceptual_vertical.png", maxW: 560 },
  { file: "fig3_mapa_2x2.png", maxW: 430 },
];

function imageParagraph(file, maxW = MAX_IMG_PX) {
  const buf = fs.readFileSync(path.join(FIG, file));
  const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20); // PNG IHDR
  const width = Math.min(maxW, MAX_IMG_PX);
  const height = Math.round((h / w) * width);
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 200 },
    children: [new ImageRun({ type: "png", data: buf, transformation: { width, height },
      altText: { title: file, description: file, name: file } })],
  });
}

function tableFrom(rows, totalW = CONTENT_W) {
  const parse = (l) => l.trim().replace(/^\|/, "").replace(/\|$/, "").split(/(?<!\\)\|/).map((c) => c.trim());
  const header = parse(rows[0]);
  const body = rows.slice(2).map(parse);
  const ncol = header.length;
  body.forEach((r) => { while (r.length < ncol) r.push(""); r.length = ncol; });
  const all = [header, ...body];
  const plain = (s) => s.replace(/\*\*|\\\*|`/g, "").replace(/https?:\/\/\S+/g, "URLxxxxxxxxxxxx");
  const fontHalf = ncol >= 6 ? 15 : 17;
  const charDxa = fontHalf * 10 * 0.55; // ancho medio de carácter en DXA
  const weights = [], mins = [];
  for (let c = 0; c < ncol; c++) {
    let mx = 4, tot = 0, longest = 3;
    for (const r of all) {
      const txt = plain(r[c] || "");
      const L = txt.length; mx = Math.max(mx, Math.min(L, 70)); tot += L;
      for (const w of txt.split(/\s+/)) longest = Math.max(longest, Math.min(w.length, 18));
    }
    const avg = tot / all.length;
    weights.push(Math.max(5, Math.sqrt(mx) * 2 + Math.min(avg, 60) * 0.6));
    mins.push(Math.round(longest * charDxa * 1.08 + 170));
  }
  let minSum = mins.reduce((a, b) => a + b, 0);
  if (minSum > totalW) { const f = totalW / minSum; for (let c = 0; c < ncol; c++) mins[c] = Math.floor(mins[c] * f); minSum = mins.reduce((a, b) => a + b, 0); }
  const sumW = weights.reduce((a, b) => a + b, 0);
  const free = totalW - minSum;
  let widths = mins.map((m, c) => m + Math.round(free * weights[c] / sumW));
  const diff = totalW - widths.reduce((a, b) => a + b, 0);
  widths[widths.indexOf(Math.max(...widths))] += diff;
  const small = fontHalf;
  const border = { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" };
  const borders = { top: border, bottom: border, left: border, right: border };
  const mkCell = (txt, c, isHeader, zebra) => new TableCell({
    width: { size: widths[c], type: WidthType.DXA },
    borders,
    verticalAlign: VerticalAlign.TOP,
    shading: isHeader ? { fill: "DCE6F2", type: ShadingType.CLEAR, color: "auto" }
      : zebra ? { fill: "F7F9FC", type: ShadingType.CLEAR, color: "auto" } : undefined,
    margins: { top: 50, bottom: 50, left: 80, right: 80 },
    children: [new Paragraph({
      spacing: { before: 0, after: 0, line: 252 },
      children: inlineRuns(txt, { size: small, bold: isHeader ? true : undefined, font: FONT }),
    })],
  });
  return new Table({
    width: { size: totalW, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({ tableHeader: true, cantSplit: true, children: header.map((h, c) => mkCell(h, c, true)) }),
      ...body.map((r, i) => new TableRow({ cantSplit: true, children: r.map((t, c) => mkCell(t, c, false, i % 2 === 1)) })),
    ],
  });
}

let listInstance = 0;
// Entradas del índice y del índice de tablas y figuras, en orden de aparición
const TOC_ENTRIES = [], TOF_ENTRIES = [];
let bmCounter = 0;
const plainText = (t) => t.replace(/\\\*/g, "*").replace(/\*\*/g, "").replace(/(?<!\w)\*([^*]+)\*/g, "$1").replace(/`/g, "");
function bookmarked(runs, list, title, level) {
  const id = "_Toc" + String(100000 + (++bmCounter));
  list.push({ title, level, href: id });
  return [new Bookmark({ id, children: runs })];
}
function convert(md, opts = {}) {
  const out = [];
  const lines = md.split("\n");
  let i = 0;
  let partMode = !!opts.partMode;
  let refMode = false;
  let para = [];
  const flushPara = () => {
    if (!para.length) return;
    const text = para.join(" ").trim();
    para = [];
    if (!text) return;
    const isCaption = /^\*\*(Tabla|Figura) \d+\.\*\*/.test(text);
    const isRef = refMode && !/^Estado de verificación/.test(text);
    const P = new Paragraph({
      style: isCaption ? "Caption" : undefined,
      keepNext: isCaption,
      alignment: isCaption || isRef ? AlignmentType.LEFT : AlignmentType.JUSTIFIED,
      indent: isRef ? { left: 567, hanging: 567 } : undefined,
      spacing: isCaption ? { before: 240, after: 100 } : isRef ? { after: 100, line: 264 } : { after: 140, line: 288 },
      children: isCaption ? bookmarked(inlineRuns(text), TOF_ENTRIES, plainText(text), 1) : inlineRuns(text),
    });
    if (isCaption) P.__caption = true;
    out.push(P);
  };
  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();
    if (t.startsWith("```mermaid")) {
      flushPara();
      while (i < lines.length && lines[i].trim() !== "```") i++;
      i++;
      const f = MERMAID_FIGS[figCounter++];
      if (f) out.push(imageParagraph(f.file, f.maxW));
      continue;
    }
    if (/^\*Versión renderizada:/.test(t)) { i++; continue; }
    const img = t.match(/^!\[[^\]]*\]\(figuras\/([^)]+)\)$/);
    if (img) { flushPara(); out.push(imageParagraph(img[1])); i++; continue; }
    const h = t.match(/^(#{1,4}) (.*)$/);
    if (h) {
      flushPara();
      const lvl = h[1].length;
      const txt = h[2];
      refMode = /^10\. Referencias/.test(txt);
      if (lvl === 1) {
        partMode = true;
        out.push(new Paragraph({ children: [new PageBreak()] }));
        out.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: bookmarked(inlineRuns(txt), TOC_ENTRIES, plainText(txt), 1) }));
      } else {
        const map = partMode ? { 2: HeadingLevel.HEADING_2, 3: HeadingLevel.HEADING_3, 4: HeadingLevel.HEADING_4 }
          : { 2: HeadingLevel.HEADING_1, 3: HeadingLevel.HEADING_2, 4: HeadingLevel.HEADING_3 };
        const isMajor = !partMode && lvl === 2 && opts.pageBreakMajors;
        const tocLevel = { [HeadingLevel.HEADING_1]: 1, [HeadingLevel.HEADING_2]: 2, [HeadingLevel.HEADING_3]: 3 }[map[lvl]];
        const kids = tocLevel ? bookmarked(inlineRuns(txt), TOC_ENTRIES, plainText(txt), tocLevel) : inlineRuns(txt);
        out.push(new Paragraph({ heading: map[lvl], pageBreakBefore: isMajor && !/^1\. /.test(txt), children: kids }));
      }
      i++; continue;
    }
    if (t === "---") { flushPara(); i++; continue; }
    if (t.startsWith("|")) {
      flushPara();
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) { rows.push(lines[i]); i++; }
      if (rows.length >= 2) {
        const ncol = rows[0].trim().replace(/^\|/, "").replace(/\|$/, "").split("|").length;
        if (ncol >= 9) {
          // la leyenda previa viaja con la tabla a la página horizontal
          const cap = out.length && out[out.length - 1].__caption ? out.pop() : null;
          out.push({ __landscape: [ ...(cap ? [cap] : []), tableFrom(rows, LAND_W) ] });
        } else { out.push(tableFrom(rows)); out.push(new Paragraph({ spacing: { after: 120 }, children: [] })); }
      }
      continue;
    }
    const bl = t.match(/^[-*] (.*)$/);
    const nl = t.match(/^(\d+)\. (.*)$/);
    if (bl || nl) {
      flushPara();
      const ordered = !!nl;
      const inst = ++listInstance;
      while (i < lines.length) {
        const tt = lines[i].trim();
        const b2 = tt.match(/^[-*] (.*)$/), n2 = tt.match(/^(\d+)\. (.*)$/);
        if (ordered ? !n2 : !b2) break;
        const txt = ordered ? n2[2] : b2[1];
        out.push(new Paragraph({
          numbering: { reference: ordered ? "num" : "bul", level: 0, instance: ordered ? inst : undefined },
          spacing: { after: 80, line: 276 },
          alignment: AlignmentType.LEFT,
          children: inlineRuns(txt),
        }));
        i++;
      }
      continue;
    }
    if (t === "") { flushPara(); i++; continue; }
    para.push(t);
    i++;
  }
  flushPara();
  return out;
}

// ---------- Contenido ----------
let article = fs.readFileSync(path.join(ROOT, "articulo_value_shift.md"), "utf8");
const lines = article.split("\n");
const title = lines[0].replace(/^# /, "");
const versionLine = lines[2].replace(/\*\*/g, "");
article = lines.slice(3).join("\n");

// Anexos D y E: plan inicial e informe de auditoría
const demote = (md, newTitle) => {
  const ls = md.split("\n");
  ls[0] = "## " + newTitle;
  return ls.map((l, k) => (k === 0 ? l : l.replace(/^(#{2,3}) /, "#$1 "))).join("\n");
};
const plan = demote(fs.readFileSync(path.join(ROOT, "00_plan_y_huecos.md"), "utf8"), "Anexo D. Plan de trabajo y los 10 huecos iniciales");
const audit = demote(fs.readFileSync(path.join(ROOT, "04_auditoria_final.md"), "utf8"), "Anexo E. Informe de auditoría final (tres rondas)");
article = article.replace(/\n---\n\n# Cierre para el autor/, "\n\n" + plan + "\n\n" + audit + "\n\n---\n\n# Cierre para el autor");

const body = convert(article, { pageBreakMajors: true });

// ---------- Portada ----------
const cover = [
  new Paragraph({ spacing: { before: 2200 }, children: [new TextRun({ text: "PROYECTO VALUE SHIFT", bold: true, color: COLOR_ACCENT, size: 26, characterSpacing: 40 })] }),
  new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: COLOR_ACCENT, space: 8 } }, spacing: { after: 400 }, children: [] }),
  new Paragraph({ spacing: { after: 300 }, children: [new TextRun({ text: title, bold: true, size: 40, color: COLOR_H })] }),
  new Paragraph({ spacing: { after: 600 }, children: [new TextRun({ text: "Marco teórico integrado, evidencia verificada, hipótesis reformuladas y modelo conceptual", size: 26, color: COLOR_MUTED, italics: true })] }),
  new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: versionLine, size: 22, color: COLOR_MUTED })] }),
  new Paragraph({ spacing: { after: 1200 }, children: [new TextRun({ text: "Revisión narrativa estructurada · APA 7 · Español", size: 22, color: COLOR_MUTED })] }),
  new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Leyenda de verificación", bold: true, size: 20, color: COLOR_H })] }),
  ...[
    "✅ fuente primaria abierta y leída",
    "✅* cifra confirmada en un extracto de la página primaria",
    "🔎 pendiente: solo prensa, solo los pilares o extracto insuficiente",
    "❌ cifra contradicha por la fuente primaria (corregida o retirada)",
  ].map((s) => new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: s, size: 20, color: COLOR_MUTED })] })),
  new Paragraph({ spacing: { before: 300 }, children: [new TextRun({ text: "Etiquetas de afirmaciones: [Hecho], [Inferencia], [Especulación] · confianza Alta, Media o Baja.", size: 20, color: COLOR_MUTED })] }),
];

const PAGES_FILE = path.join(__dirname, "toc_pages.json");
const pages = fs.existsSync(PAGES_FILE) ? JSON.parse(fs.readFileSync(PAGES_FILE, "utf8")) : { toc: [], tof: [] };
fs.writeFileSync(path.join(__dirname, "toc_entries.json"), JSON.stringify({ toc: TOC_ENTRIES, tof: TOF_ENTRIES }, null, 1));
const withPages = (list, pg) => list.map((e, k) => ({ ...e, page: pg[k] !== undefined ? pg[k] : "" }));
const toc = [
  new Paragraph({ children: [new PageBreak()] }),
  new Paragraph({ style: "TOCHeading", children: [new TextRun("Índice")] }),
  new TableOfContents("Índice", { hyperlink: true, headingStyleRange: "1-3", cachedEntries: withPages(TOC_ENTRIES, pages.toc) }),
  new Paragraph({ children: [new PageBreak()] }),
  new Paragraph({ style: "TOCHeading", children: [new TextRun("Índice de tablas y figuras")] }),
  new TableOfContents("Índice de tablas y figuras", { hyperlink: true, stylesWithLevels: [new StyleLevel("Caption", 1)], cachedEntries: withPages(TOF_ENTRIES, pages.tof) }),
  new Paragraph({ children: [new PageBreak()] }),
];


// ---------- Secciones (vertical, con páginas horizontales para tablas anchas) ----------
const pageProps = (land) => ({ page: { size: { width: PAGE_W, height: PAGE_H, orientation: land ? PageOrientation.LANDSCAPE : PageOrientation.PORTRAIT },
  margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN, header: 700, footer: 700 } } });
const mkHeader = () => new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT,
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF", space: 4 } },
  children: [new TextRun({ text: "Value Shift · Marco teórico integrado · v1.2", size: 16, color: COLOR_MUTED })] })] });
const mkFooter = () => new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
  children: [new TextRun({ children: ["Página ", PageNumber.CURRENT, " de ", PageNumber.TOTAL_PAGES], size: 16, color: COLOR_MUTED })] })] });
function buildSections() {
  const all = [...cover, ...toc, ...body];
  const secs = [];
  let cur = [];
  let first = true;
  const close = (land, children) => {
    if (!children.length) return;
    const props = pageProps(land);
    if (first) props.titlePage = true;
    secs.push({ properties: props,
      headers: first ? { default: mkHeader(), first: new Header({ children: [new Paragraph({ children: [] })] }) } : { default: mkHeader() },
      footers: first ? { default: mkFooter(), first: new Footer({ children: [new Paragraph({ children: [] })] }) } : { default: mkFooter() },
      children });
    first = false;
  };
  for (const el of all) {
    if (el && el.__landscape) { close(false, cur); cur = []; close(true, el.__landscape); }
    else cur.push(el);
  }
  close(false, cur);
  return secs;
}

// ---------- Documento ----------
const doc = new Document({
  creator: "Proyecto Value Shift",
  title: "Value Shift: marco teórico integrado",
  description: "Artículo de investigación con anexos y auditoría",
  features: { updateFields: true },
  styles: {
    default: { document: { run: { font: FONT, size: BODY_PT * 2 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: COLOR_H, font: FONT },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0, keepNext: true } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, color: COLOR_H, font: FONT },
        paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 1, keepNext: true } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 23, bold: true, color: COLOR_ACCENT, font: FONT },
        paragraph: { spacing: { before: 220, after: 100 }, outlineLevel: 2, keepNext: true } },
      { id: "Heading4", name: "Heading 4", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, italics: true, color: COLOR_H, font: FONT },
        paragraph: { spacing: { before: 180, after: 80 }, outlineLevel: 3, keepNext: true } },
      { id: "Caption", name: "caption", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 20, color: COLOR_H, font: FONT } },
      { id: "TOC1", name: "toc 1", basedOn: "Normal", next: "Normal", run: { size: 21, bold: true, color: COLOR_H }, paragraph: { spacing: { before: 100, after: 30 } } },
      { id: "TOC2", name: "toc 2", basedOn: "Normal", next: "Normal", run: { size: 20 }, paragraph: { indent: { left: 240 }, spacing: { after: 20 } } },
      { id: "TOC3", name: "toc 3", basedOn: "Normal", next: "Normal", run: { size: 19, color: COLOR_MUTED }, paragraph: { indent: { left: 480 }, spacing: { after: 10 } } },
      { id: "TableofFigures", name: "table of figures", basedOn: "Normal", next: "Normal", run: { size: 20 }, paragraph: { spacing: { after: 30 } } },
      { id: "TOCHeading", name: "TOC Heading", basedOn: "Normal", next: "Normal",
        run: { size: 32, bold: true, color: COLOR_H, font: FONT }, paragraph: { spacing: { after: 240 } } },
    ],
  },
  numbering: {
    config: [
      { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] },
      { reference: "num", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 540, hanging: 300 } } } }] },
    ],
  },
  sections: buildSections(),
});

Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(OUT, buf); console.log("Escrito:", OUT, (buf.length / 1024).toFixed(0), "KB"); });
