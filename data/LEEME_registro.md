# Registro de picks (desde 26-oct-2026)

- `picks_log.csv` — **append-only**: una fila por pick, escrita ANTES del inicio del partido. Nunca se edita ni se reescribe (se verifica contra el commit anterior). Columnas: id, deporte, partido, mercado, linea, casa, cuota_decimal, prob_modelo (calibrada), prob_implicita_sin_margen, ev, stake_sugerido, hora_publicacion (UTC), resultado (vacío), hora_cierre (vacía), cuota_cierre (vacía).
- `picks_resultados.csv` y `picks_cierres.csv` — también append-only; el resultado y la cuota de cierre se agregan aquí y se unen al mostrar (así la fila original del pick nunca cambia).
- `picks_detalle.jsonl` — detalle de cada pick (probabilidad cruda, grupo de calibración, muestra, snapshot de cuotas).
- `picks_historico_sin_cuota.csv` — lo publicado antes del 26-oct-2026, calificado, sin cuota (no cuenta como registro; ROI solo «a cuota de referencia» cuando existe).
- `resultados.json` — resumen que alimenta `/picks/resultados/`.

Código: `/workspace/picks_sistema/` (picks_log.py, nfl_evaluar.py, cierre_nfl.py, calificar_nfl.py, resultados.py). Juego responsable, +18.
