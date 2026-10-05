# Auditoría final del artículo Value Shift

**Fecha:** 5 de octubre de 2026 · **Versión auditada:** `articulo_value_shift.md` v1.1

Esta auditoría cierra el trabajo con cuatro revisiones: (1) segunda ronda de verificación de cifras, (2) coherencia de cifras entre archivos, (3) cumplimiento de las diez reglas del encargo y (4) referencias.

**Límite que se mantiene.** La red de la sesión sigue bloqueando la apertura directa de casi todos los repositorios académicos. Las verificaciones de esta ronda usan extractos de la página primaria devueltos por el buscador (estado ✅\*). Solo dos documentos se abrieron completos (✅, anthropic.com).

## 1. Segunda ronda de verificación

Revisé 31 cifras o datos que estaban en 🔎. Resultado: 23 confirmados (✅\*), 6 corregidos y 2 que siguen pendientes de lectura completa (la cifra senior de Canaries 2026 y los decimales de Dratsch et al.).

### 1.1 Correcciones aplicadas

| # | Dato | Antes | Después | Fuente | Archivos corregidos |
|---|---|---|---|---|---|
| C1 | Ganancia de productividad de los menos expertos (Brynjolfsson, Li y Raymond) | +34 % atribuido a la versión QJE | **+30 %** en QJE (2025); el +34 % es de la versión NBER (2023) | Página de la QJE; resúmenes de Stanford HAI y MIT Sloan | Artículo §3.8, §4.2, §6.1, §7.2, Anexos A y B; `01_auditoria.md`; `03_critica.md` |
| C2 | Hosseini Maasoum y Lichtinger, versión 2026 | "≈9 %" no verificado | **≈9 %** a seis trimestres y 8–10 % a dos años (revisión de mayo de 2026) | ProMarket, 17 de junio de 2026 | Artículo §3.8, §4.2, Anexo B; `01_auditoria.md`; `02_expansion_fuentes.md` |
| C3 | Canaries 2026, trabajadores con experiencia | +10 % para 35–49 años, mostrado en la Figura 4 | **Retirado de la Figura 4.** El paper dice que los experimentados "no muestran una brecha comparable", sin que pudiera verificar la cifra. La versión de 2025 sí da +6 % a +9 % para mayores frente a −6 % de 22–25 años | Stanford Digital Economy Lab | Figura 4 y su tabla; Anexo B |
| C4 | Budzyń et al., caída relativa | ≈ −21 % (cálculo propio) | **−20 % relativo según los autores**; 226/795 → 145/648; tres meses antes y después; cuatro centros | Nota de prensa de *The Lancet* (EurekAlert, Drugs.com) | Artículo §3.8, Anexo B; `01_auditoria.md` |
| C5 | OpenAI / Hugging Face | "Hugging Face detectó y contuvo la intrusión el 16 de julio" | Ataque del **9 al 13 de julio**; Hugging Face lo **divulgó** el 16 de julio; OpenAI se lo atribuyó el 21. Hugging Face afirma que no se alteraron modelos, datasets ni Spaces públicos, pero hubo acceso a datasets internos y credenciales | Cronología técnica del blog de Hugging Face (localizada); Fortune | Artículo §7.8, Anexo B, referencias; `02_expansion_fuentes.md` |
| C6 | Acemoglu | Citado como 2024 (working paper) | **2025**, *Economic Policy* 40(121), con el WP de 2024 como versión de trabajo | Página de la revista | Artículo (5 citas), `03_critica.md`, referencias |

Correcciones menores: orden de autores de Gillespie et al. (2025) (Gillespie, Lockey, Macdade, Ward y Hassed); año de revisión de Agarwal et al. (2024, no 2026); número de artículo de Horton et al. (19001) y de Stephany y Teutloff (104898) confirmados; la corrección publicada de Bastani et al. en PNAS solo afecta a una afiliación, no a los resultados.

### 1.2 Cifras confirmadas en esta ronda (✅\*)

Krueger (+82 % frente a IPC +17 %); Eloundou et al. (80 % y 19 %); Hui et al. (−2 % y −5,2 %); Porter y Machery (46,6 %, N = 16.340 juicios); Weingarten y Goodman (d = 0,383; 141 estudios; 360 efectos); Taras et al. (≈80 %; 558 estudios); McElheran et al. (<6 %; >18 % ponderado); Macnamara et al. (12 %; <1 % en profesiones); Bastani et al. (+48 %, +127 %, −17 %); Dratsch et al. (≈80 % → <20 %; 82 % → 45,5 %); METR (−19 % real; +24 % esperado; +20 % percibido); Acemoglu (0,66 %; <0,53 %); Dell'Acqua et al. (+43 %, +17 %, −19 p. p. en la versión de 2023); Goh et al. (76 % frente a 74 %, n. s.); Agarwal et al. (contexto sí, predicciones no); Steyvers et al. (explicaciones largas suben la confianza); Doshi y Hauser (+10,7 % novedad; +11,5 % utilidad); Shin et al. (PNAS 120(12)); Institute of Student Employers (graduados −8 %, aprendices +8 %, entrada −5 %); Klarna, Form F-1 (5.527 → 4.352 → 3.422); WIPO (EE. UU. 15,6/10,3; Francia 15,2/11,1); Polanyi (p. 4); Humlum y Vestergaard (nulos también en inicio de carrera; revisión del 23 de octubre de 2025).

### 1.3 Estado del registro de verificación (Anexo B)

| Estado | Filas | % |
|---|---|---|
| ✅ abierta | 2 | 3 % |
| ✅\* confirmada en extracto de página primaria | 60 | 77 % |
| ✅\* / 🔎 mixto | 2 | 3 % |
| 🔎 pendiente | 10 | 13 % |
| ❌ contradicha (y corregida en el texto) | 4 | 5 % |
| **Total** | **78** | 100 % |

Las cuatro ❌ son errores de las fuentes secundarias que el artículo ya no usa: KPMG Reino Unido "−29 %", Krueger "54 %", Chandar y Klein Teeselink "−3 %" y Shen y Tamkin "17 % menos".

## 2. Coherencia de cifras entre archivos

Comparé las cifras de `00_plan_y_huecos.md`, `01_auditoria.md`, `02_expansion_fuentes.md`, `03_critica.md` y el artículo.

| Cifra | Antes de la auditoría | Ahora |
|---|---|---|
| Brynjolfsson, Li y Raymond, novatos | 34 % en artículo, auditoría y crítica | 30 % (QJE) con el 34 % atribuido a la versión NBER en los cuatro archivos |
| Hosseini Maasoum y Lichtinger | 7,7 % con 9 % "sin verificar" | 7,7 % (2025) y ≈9 % (2026) en artículo, auditoría y expansión |
| Acemoglu | 2024 en el texto, 2024/2025 en la auditoría | 2025 en todos los archivos |
| OpenAI / Hugging Face | Fecha de detección incorrecta en artículo y expansión | Cronología corregida en ambos |
| Budzyń et al. | −21 % relativo en artículo y auditoría | −20 % relativo según los autores en ambos |
| Canaries senior | +10 % en Figura 4 | Retirado; nota explicativa en la tabla |

No quedan discrepancias entre archivos en las cifras centrales.

## 3. Cumplimiento de las reglas del encargo

| Regla | Comprobación | Resultado |
|---|---|---|
| 1. Ninguna cita sin DOI o URL abierta | Las 131 referencias llevan DOI o URL y su estado. 3 abiertas (✅), 58 confirmadas en extracto (✅\*), 24 libros, 46 en 🔎 | **Cumplida parcialmente por límite de red.** Ninguna referencia 🔎 sostiene sola una afirmación central; todas las afirmaciones centrales tienen al menos una fuente ✅\* |
| 2. Dos fuentes independientes por afirmación central | Revisé las cinco conclusiones de §8.1 y los cuatro veredictos de §6 | Cumplida. Excepciones declaradas en el texto: la asimetría de etiquetas (Frontiers, 2026) tiene una sola fuente y está marcada como confianza Media |
| 3. Etiquetas [Hecho/Inferencia/Especulación] con confianza | 80 etiquetas en el cuerpo (64 Hecho, 11 Inferencia, 3 Especulación, 2 Señal); todas las subsecciones de evidencia (§4.1–4.6, §6.1–6.4, §8.1–8.3) tienen etiquetas | Cumplida |
| 4. Correlación frente a causalidad; diseño del estudio | Corregí una frase de §6.3 que atribuía la caída de la entrada a la IA; ahora dice que tres estudios usan diferencias en diferencias y uno es descriptivo | Cumplida |
| 5. Consultoras y prensa como señal | Ocean Tomo, CGTrader, Klarna, IBM, Big Four: marcados como señal o prensa | Cumplida |
| 6. No suavizar la evidencia en contra | H2 declarada "no probada en precios"; H4 "no apoyada a nivel país"; H3 "efecto de largo plazo no probado" | Cumplida |
| 7. Unidad, periodo, país y versión en cada cifra | Revisadas las cifras de §4 y §6; las de Canaries, Brynjolfsson, Hosseini, Humlum y Bick llevan versión | Cumplida en cifras centrales |
| 8. Citas textuales con página o sección | Polanyi (p. 4); Anthropic (sección de resumen); Klarna e IBM (prensa, fecha y medio); Smith (libro I, cap. IV) | Cumplida; IBM y Klarna siguen pendientes de la fuente original |
| 9. Postura optimista con condiciones | §2.3 y §8.3; tres condiciones explícitas y un supuesto de fracaso | Cumplida |
| 10. "Commodity" = valor sin prima | Definida en el resumen, §2.1, Tabla 2 y Tabla 3 | Cumplida |

## 4. Referencias

| Comprobación | Resultado |
|---|---|
| Cada cita del texto tiene referencia | Cruce automático entre citas autor-año y lista. Faltaban alias para BCE, FRI e ISE (añadidos) y la cita "IBM (2026)", que ahora remite a Axios (2026). Las fuentes de Anexo C (Meijer, Rifkin, Toner-Rodgers, Variety, Eventbrite) no llevan referencia porque están descartadas |
| Referencias añadidas | Hugging Face (2026), Klarna Group plc (2025, Form F-1), ProMarket (2026) |
| Orden alfabético (APA 7) | Lista reordenada; 131 entradas |
| Estados de verificación | 15 referencias pasan de 🔎 a ✅\* tras la segunda ronda |

## 5. Extensión

- Cuerpo del artículo (secciones 1–9, sin referencias ni anexos), con tablas: **11.999 palabras**.
- Sin tablas ni diagramas: **≈9.150 palabras**.
- Resumen: 208 palabras.

Ambas medidas están dentro del rango pedido (9.000–12.000). Para entrar en el límite, condensé la tabla de §3.8; el detalle completo está en `01_auditoria.md` y en el Anexo B.

## 6. Lo que queda abierto (y por qué)

Los diez puntos de la lista (a) del artículo dependen de abrir documentos que la red bloquea o que no son públicos: el PDF de Canaries 2026, el comunicado de OpenAI, el anexo por país de WIPO, la herramienta de The Culture Factor, los datos del WVS, la entrevista de Bloomberg con Klarna, la fuente original de la cita de IBM, la versión publicada de Dell'Acqua et al., los decimales de Dratsch et al. y dos listas de autores. Ninguno cambia un veredicto: todos afectan a cifras secundarias, a citas o a metadatos de referencias.
