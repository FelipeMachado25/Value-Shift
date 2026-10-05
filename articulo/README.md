# Value Shift: marco teórico integrado (v1.2, tres auditorías, 5 de octubre de 2026)

| Archivo | Contenido |
|---|---|
| `00_plan_y_huecos.md` | Plan en una página y los 10 huecos o contradicciones más graves |
| `01_auditoria.md` | Fase 1: registro de 60 afirmaciones, cifras en conflicto resueltas, pendientes |
| `02_expansion_fuentes.md` | Fase 2: fuentes nuevas por vacío (a–f) |
| `03_critica.md` | Fase 3: ataque a H1–H4 |
| `04_auditoria_final.md` | Auditoría final: segunda ronda de verificación, coherencia entre archivos, cumplimiento de reglas y referencias |
| `articulo_value_shift.md` | Fases 4 y 5: artículo completo, anexos A–C y cierre (verificaciones y lecturas pendientes) |
| `docx/Value_Shift_marco_teorico.docx` | **Documento final en Word**: portada, índice con páginas, índice de tablas y figuras, artículo, anexos A–E y cierre |
| `docx/Value_Shift_marco_teorico_vista_previa.pdf` | Vista previa en PDF del DOCX |
| `figuras/` | Figuras 1–6 (PNG), diagramas Mermaid renderizados y código Python de los gráficos 4–6 |

Regenerar los gráficos: `cd figuras && pip install matplotlib && python3 fig4_junior_senior.py && python3 fig5_intangibles.py && python3 fig6_confianza_adopcion.py`.

Regenerar el DOCX (requiere Node con `docx`, LibreOffice Writer y la fuente Carlito): `cd docx && python3 build.py <ruta a scripts/ de la skill docx>`. El script hace dos pasadas para calcular los números de página del índice.
