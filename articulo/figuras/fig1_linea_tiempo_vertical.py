"""Figura 1 (versión para DOCX): línea de tiempo vertical de Smith (1776) a 2026."""
import matplotlib.pyplot as plt
import estilo

HITOS = [
    ("1776", "Smith, La riqueza de las naciones: agua y diamante; fábrica de alfileres", 0),
    ("1871", "Menger y Jevons: valor subjetivo y marginal", 0),
    ("1911", "Taylor: administración científica", 0),
    ("1942", "Schumpeter: destrucción creativa", 1),
    ("1966", "Polanyi: la dimensión tácita · Baumol y Bowen: enfermedad de costes", 1),
    ("1976", "Hirsch: bienes posicionales", 1),
    ("1990", "David: la dinamo y el ordenador", 1),
    ("1995", "Bresnahan y Trajtenberg: tecnologías de propósito general", 1),
    ("1997", "Christensen: el dilema del innovador", 1),
    ("1998", "Pine y Gilmore: economía de la experiencia · Shapiro y Varian", 1),
    ("2003", "Autor, Levy y Murnane: el enfoque de tareas", 2),
    ("2004", "Vargo y Lusch: lógica dominante del servicio", 2),
    ("2009", "Kahneman y Klein: condiciones de la intuición experta", 2),
    ("2012", "Fin de la Britannica impresa · quiebra de Kodak", 2),
    ("2017", "Haskel y Westlake: capitalismo sin capital", 2),
    ("2018", "Agrawal, Gans y Goldfarb: máquinas de predicción", 2),
    ("2022", "Lanzamiento de ChatGPT (noviembre)", 3),
    ("2023", "Eloundou et al.: exposición · Dell'Acqua et al.: frontera irregular", 3),
    ("2024", "Vaccaro et al.: metaanálisis humano-IA · Ley de IA de la UE", 3),
    ("2025", "Canaries (ago) · Brynjolfsson, Li y Raymond en QJE · Klarna vuelve a contratar", 3),
    ("2026", "IBM triplica la entrada · incidentes OpenAI y Anthropic (jul) · Canaries: brecha del 19 %", 3),
]
ETAPAS = ["Teoría del valor y división del trabajo", "Tecnología, profesiones y conocimiento",
          "Tareas, intangibles y predicción", "IA generativa"]
COLORES = ["#2a78d6", "#1baf7a", "#eb6834", "#4a3aa7"]

def main():
    estilo.aplicar()
    n = len(HITOS)
    fig, ax = plt.subplots(figsize=(8.2, 10.5))
    ax.axis("off")
    ax.set_xlim(0, 10); ax.set_ylim(-0.8, n + 1.1)
    ax.plot([1.6, 1.6], [0, n - 1], color=estilo.GRID, linewidth=2, zorder=1)
    for i, (anio, texto, etapa) in enumerate(HITOS):
        y = n - 1 - i
        ax.scatter(1.6, y, s=60, color=COLORES[etapa], edgecolor=estilo.SURFACE, linewidth=2, zorder=3)
        ax.text(1.25, y, anio, ha="right", va="center", fontsize=10, fontweight="bold", color=estilo.TEXT)
        ax.text(1.95, y, texto, ha="left", va="center", fontsize=8.6, color=estilo.TEXT, wrap=True)
    for k, (et, col) in enumerate(zip(ETAPAS, COLORES)):
        cx = 0.3 + (k % 2) * 4.6
        cy = n + 0.75 - (k // 2) * 0.55
        ax.scatter(cx, cy, s=50, color=col)
        ax.text(cx + 0.2, cy, et, fontsize=8.4, va="center", color=estilo.TEXT2)
    fig.suptitle("Del valor-trabajo a la IA generativa (1776–2026)", x=0.02, ha="left", fontweight="bold", fontsize=12)
    fig.tight_layout(rect=(0, 0, 1, 0.97))
    fig.savefig("fig1_linea_tiempo_vertical.png", dpi=200)

if __name__ == "__main__":
    main()
