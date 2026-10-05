"""Figura 4. Empleo junior frente a senior en ocupaciones o empresas expuestas a la IA.

Los cuatro estudios usan métricas distintas; no se deben comparar las barras entre estudios,
solo junior frente a senior dentro de cada estudio. NaN = el estudio no da una cifra puntual.
"""
import math
import matplotlib.pyplot as plt
import estilo

# estudio, métrica, junior (%), senior (%), estado de verificación
DATOS = [
    ("Brynjolfsson, Chandar y Chen\n(EE. UU., ADP, nov 2022–jun 2026;\nversión ago 2026)",
     "Cambio del nivel de empleo", -11.0, 10.0, "junior ✅*; senior 35–49 🔎"),
    ("Hosseini Maasoum y Lichtinger\n(EE. UU., currículos, 6 trimestres\ntras adopción; versión ago 2025)",
     "Efecto relativo a no adoptantes", -7.7, math.nan, "✅*; senior «sin cambios», sin cifra"),
    ("Klein Teeselink\n(Reino Unido, Revelio, 2021–2025)",
     "Efecto en empresas muy expuestas", -5.8, math.nan, "✅*; senior «sin efecto», sin cifra"),
    ("Chandar y Klein Teeselink\n(41 países, filiales de adoptantes,\nversión sep 2026)",
     "Efecto relativo a filiales control", -2.5, 6.7, "✅*"),
]

def main():
    estilo.aplicar()
    fig, ax = plt.subplots(figsize=(9, 5.6))
    n = len(DATOS)
    alto = 0.36
    for i, (est, met, jun, sen, _) in enumerate(DATOS):
        y = n - 1 - i
        ax.barh(y + alto / 2, jun, height=alto - 0.04, color=estilo.SERIE_1, label="Junior (22–25 años o baja antigüedad)" if i == 0 else None)
        ax.text(jun - 0.4, y + alto / 2, f"{jun:+.1f} %", va="center", ha="right", fontsize=9, color=estilo.TEXT)
        if math.isnan(sen):
            ax.text(0.4, y - alto / 2, "senior: sin cambio significativo (sin cifra puntual)", va="center", ha="left", fontsize=8, color=estilo.TEXT2, style="italic")
        else:
            ax.barh(y - alto / 2, sen, height=alto - 0.04, color=estilo.SERIE_2, label="Senior (35–49 años o alta antigüedad)" if i == 0 else None)
            ax.text(sen + 0.4, y - alto / 2, f"{sen:+.1f} %", va="center", ha="left", fontsize=9, color=estilo.TEXT)
        ax.text(-15.5, y - 0.02, met, fontsize=7.5, color=estilo.TEXT2, va="top")
    ax.set_yticks(range(n))
    ax.set_yticklabels([d[0] for d in reversed(DATOS)], fontsize=8)
    ax.axvline(0, color=estilo.TEXT2, linewidth=1)
    ax.set_xlim(-16, 16)
    ax.set_xlabel("Cambio en el empleo (%)")
    ax.grid(axis="y", visible=False)
    ax.set_title("La entrada se estrecha; los perfiles con experiencia no caen")
    ax.legend(loc="upper center", bbox_to_anchor=(0.5, -0.1), ncol=2, frameon=False, fontsize=8)
    estilo.fuente(fig, "Fuentes: Brynjolfsson, Chandar y Chen (2026); Hosseini Maasoum y Lichtinger (2025); Klein Teeselink (2025); "
                       "Chandar y Klein Teeselink (2026). Métricas no comparables entre estudios. Todos observacionales.")
    fig.tight_layout(rect=(0, 0.06, 1, 1))
    fig.savefig("fig4_junior_senior.png", dpi=200)

if __name__ == "__main__":
    main()
