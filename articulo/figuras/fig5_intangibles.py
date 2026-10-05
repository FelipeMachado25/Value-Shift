"""Figura 5. Inversión intangible frente a tangible, % del PIB, 2025 (WIPO y Luiss, 2026).

n.d. = la cifra tangible no se pudo verificar en esta revisión; no se imputa.
"""
import math
import matplotlib.pyplot as plt
import estilo

# país, intangible % PIB, tangible % PIB
DATOS = [
    ("Suecia", 17.4, math.nan),
    ("EE. UU.", 15.6, 10.3),
    ("Francia", 15.2, 11.1),
    ("Reino Unido*", 13.5, math.nan),
    ("Agregado 29\neconomías", 12.8, 11.8),
    ("España", 8.0, math.nan),
]

def main():
    estilo.aplicar()
    fig, ax = plt.subplots(figsize=(9, 4.8))
    ancho = 0.38
    for i, (pais, intg, tang) in enumerate(DATOS):
        ax.bar(i - ancho / 2, intg, width=ancho - 0.04, color=estilo.SERIE_1, label="Intangible" if i == 0 else None)
        ax.text(i - ancho / 2, intg + 0.3, f"{intg:.1f}", ha="center", fontsize=8.5)
        if math.isnan(tang):
            ax.text(i + ancho / 2, 0.4, "n.d.", ha="center", fontsize=8, color=estilo.TEXT2, style="italic")
        else:
            ax.bar(i + ancho / 2, tang, width=ancho - 0.04, color=estilo.SERIE_2, label="Tangible" if i == 1 else None)
            ax.text(i + ancho / 2, tang + 0.3, f"{tang:.1f}", ha="center", fontsize=8.5)
    ax.set_xticks(range(len(DATOS)))
    ax.set_xticklabels([d[0] for d in DATOS])
    ax.set_ylabel("% del PIB, 2025")
    ax.set_ylim(0, 20)
    ax.grid(axis="x", visible=False)
    ax.set_title("La inversión intangible ya supera a la tangible en el agregado; España, a la cola")
    ax.legend(frameon=False, loc="upper right")
    estilo.fuente(fig, "Fuente: WIPO y Luiss Business School (2026), World Intangible Investment Highlights 2026. "
                       "*Reino Unido: año de la cifra por confirmar. n.d.: no verificado, no imputado.")
    fig.tight_layout(rect=(0, 0.05, 1, 1))
    fig.savefig("fig5_intangibles.png", dpi=200)

if __name__ == "__main__":
    main()
