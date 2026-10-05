"""Estilo común para las figuras de Value Shift (paleta de referencia validada, modo claro)."""
import matplotlib.pyplot as plt

SURFACE = "#fcfcfb"
TEXT = "#0b0b0b"
TEXT2 = "#52514e"
GRID = "#e4e3df"
SERIE_1 = "#2a78d6"  # azul: junior / intangible / país
SERIE_2 = "#eb6834"  # naranja: senior / tangible


def aplicar():
    plt.rcParams.update({
        "figure.facecolor": SURFACE,
        "axes.facecolor": SURFACE,
        "savefig.facecolor": SURFACE,
        "axes.edgecolor": GRID,
        "axes.labelcolor": TEXT2,
        "xtick.color": TEXT2,
        "ytick.color": TEXT2,
        "text.color": TEXT,
        "axes.grid": True,
        "grid.color": GRID,
        "grid.linewidth": 0.8,
        "axes.spines.top": False,
        "axes.spines.right": False,
        "font.size": 10,
        "axes.titlesize": 12,
        "axes.titleweight": "bold",
        "axes.titlelocation": "left",
    })


def fuente(fig, texto):
    fig.text(0.01, 0.01, texto, fontsize=7.5, color=TEXT2, ha="left", va="bottom", wrap=True)
