# Value Shift: plan de trabajo y los 10 huecos más graves

**Fecha:** 5 de octubre de 2026 · **Base:** marco v0.1 y pilares A–F (septiembre de 2026)

## Plan en cinco fases

| Fase | Rol | Qué hace | Entregable |
|---|---|---|---|
| 1 | Auditor | Extrae las afirmaciones centrales de los 7 archivos, resuelve las cifras en conflicto con la fuente primaria y lista lo no verificado. | `01_auditoria.md` |
| 2 | Investigador | Cubre los vacíos de los pilares, los pendientes de la sección 6, los capítulos 5, 9, 10 y 11, las versiones nuevas, la prima de mercado y España. | `02_expansion_fuentes.md` |
| 3 | Crítico | Ataca H1–H4 con la evidencia más fuerte en contra y dice qué dato las refutaría. | `03_critica.md` |
| 4 | Arquitecto | Reformula las hipótesis, fija los constructos, construye el modelo y escribe las proposiciones. | §5 del artículo |
| 5 | Redactor | Escribe el artículo (APA 7) con tablas, figuras y anexos. | `articulo_value_shift.md` y `figuras/` |

**Límite de esta revisión.** La política de red de la sesión bloqueó la apertura directa de casi todos los dominios académicos (nber.org, arxiv.org, ssrn.com, doi.org, stanford.edu, oup.com, nature.com, oecd.org, europa.eu…). Solo pude abrir dos fuentes primarias completas (dos páginas de anthropic.com). El resto lo verifiqué con el buscador web, que devuelve extractos de la página primaria. Por eso uso tres estados: ✅ (abierta), ✅\* (cifra confirmada en un extracto de la página primaria, sin leer el PDF completo) y 🔎 (solo prensa, solo los pilares o un extracto que no basta). ❌ marca lo contradicho.

## Los 10 huecos o contradicciones más graves

| # | Problema | Gravedad | Cómo lo resuelvo |
|---|---|---|---|
| 1 | **H2 no tiene evidencia de mercado con precios reales.** Toda la prima "humana" es de laboratorio y de disposición a pagar declarada. | Crítica | Busco primas salariales al juicio y a las habilidades sociales (Deming, 2017; 2021), primas a habilidades complementarias de la IA (Stephany y Teutloff, 2024; Mäkelä y Stephany, 2024) y datos de transacción (CGTrader, solo como señal). Declaro H2 "no probada en precios" y propongo un diseño de medición. |
| 2 | **La cifra de Canaries cambia (13 %, 16 %, 19 %).** | Alta | Son tres versiones del mismo paper (agosto de 2025, noviembre de 2025 y agosto de 2026). El 19 % es la brecha descriptiva (−11 % frente a +10 %, 0,89/1,10 ≈ 0,81). Cito siempre versión, periodo y control. |
| 3 | **H3 no tiene ninguna prueba de largo plazo.** Ningún estudio sigue a una cohorte de juniors "no contratados". | Crítica | La separo en premisa (probada: cae la contratación junior) y mecanismo (plausible: menos práctica, menos pericia). Propongo un diseño de cohortes con datos administrativos (MCVL en España). |
| 4 | **La IA también captura conocimiento tácito** (Brynjolfsson, Li y Raymond, 2025), lo que choca con "el valor migra a lo tácito". | Alta | Reformulo H2: el valor migra a lo que sigue escaso **y** el cliente puede verificar o atribuir, no a "lo tácito" en bloque. |
| 5 | **La prima humana depende de la etiqueta y de creencias.** A ciegas, la gente prefiere a menudo lo hecho por IA (Porter y Machery, 2024). La etiqueta "hecho por humanos" no añade valor; solo la etiqueta "IA" lo resta (Frontiers, 2026). | Alta | Introduzco el constructo **verificabilidad y atribución** como moderador. La prima humana es un activo de confianza, no de calidad. |
| 6 | **H4 falla a nivel país.** La confianza del público no predice la adopción empresarial y el 80 % de la variación cultural está dentro de los países (Taras et al., 2016). | Alta | Limito H4 a quienes deciden dentro de las organizaciones y la condiciono a los recursos. Retiro la matriz de Thiel como evidencia. |
| 7 | **Lo micro y lo macro se contradicen.** Cae el empleo junior expuesto, pero Dinamarca (Humlum y Vestergaard), Yale, la OCDE y el BCE no ven efectos agregados. | Alta | Los reconcilio: el ajuste ocurre en el margen de contratación y en la composición por edad, no en salarios ni en el empleo total. Lo digo como inferencia. |
| 8 | **Los constructos se solapan:** juicio, conocimiento tácito, experiencia (vivencia y pericia), conexión, tailoring. | Alta | Defino cada uno una vez (Tabla 3 y §5.1): tácito es propiedad del saber; pericia es un stock; juicio es un acto; conexión es un activo relacional; tailoring es una forma del output. |
| 9 | **El contraargumento del capítulo 5 sigue abierto.** La IA personaliza a escala y persuade más que humanos con datos mínimos (Salvi et al., 2025; Matz et al., 2024). | Alta | Distingo personalización algorítmica de tailoring contextual por tres rasgos: contexto privado, responsabilidad y cocreación. Declaro que la frontera es empírica y no está medida. |
| 10 | **Pendientes de la sección 6 y error aritmético en KPMG Reino Unido.** "Zack zack", OpenAI/Hugging Face y la "fuga" de Anthropic estaban sin fuente; "−29 %" de KPMG es un cálculo erróneo de la prensa. | Media | "Zack zack" = "¡rápido, rápido!" coloquial. OpenAI/Hugging Face: divulgado por OpenAI el 21 de julio de 2026. Anthropic: hay tres hechos distintos (filtración de Mythos por error de CMS, código de Claude Code en npm, e incidentes en evaluaciones, este último con fuente primaria abierta). KPMG: 1.399 → 942 = −32,7 %. |

**Orden de escritura del artículo:** método → pilares → modelo e hipótesis → evidencia por hipótesis → casos → discusión → anexos.
