"""Figura 6. Confianza del público en la IA frente a adopción empresarial, países de la UE con ambos datos.

Confianza: % dispuesto a confiar en la IA (Gillespie et al., 2025; encuesta nov 2024–ene 2025).
Adopción: % de empresas de 10+ empleados que usan IA (Eurostat, 2025).
Solo cuatro países tienen ambos datos verificados: no es una prueba estadística.
"""
import matplotlib.pyplot as plt
import estilo

DATOS = [  # país, confianza %, adopción %
    ("Finlandia", 25, 37.8),
    ("Alemania", 32, 26.0),
    ("Países Bajos", 33, 33.2),
    ("España", 51, 20.3),
]

def main():
    estilo.aplicar()
    fig, ax = plt.subplots(figsize=(7.5, 5))
    for pais, conf, adop in DATOS:
        ax.scatter(conf, adop, s=70, color=estilo.SERIE_1, edgecolor=estilo.SURFACE, linewidth=2, zorder=3)
        ax.annotate(pais, (conf, adop), textcoords="offset points", xytext=(8, 4), fontsize=9)
    ax.axhline(20.0, color=estilo.TEXT2, linewidth=0.8, linestyle="--")
    ax.text(21, 20.6, "media UE: 20,0 %", fontsize=8, color=estilo.TEXT2, ha="left")
    ax.set_xlim(20, 60)
    ax.set_ylim(15, 42)
    ax.set_xlabel("Público dispuesto a confiar en la IA (%)")
    ax.set_ylabel("Empresas que usan IA (%)")
    ax.set_title("Más confianza del público no significa más adopción empresarial")
    estilo.fuente(fig, "Fuentes: Gillespie et al. (2025), Univ. de Melbourne y KPMG; Eurostat (2025). "
                       "n = 4 países con ambos datos verificados; ilustrativo, no inferencial.")
    fig.tight_layout(rect=(0, 0.05, 1, 1))
    fig.savefig("fig6_confianza_adopcion.png", dpi=200)

if __name__ == "__main__":
    main()
