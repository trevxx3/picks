# picks_log.csv — registro inmutable de picks de fútbol (desde 26-oct-2026)

**Tres archivos** (en `/workspace/futbol_analisis/`, copia pública en `picks_site/fut/registro/`):

| Archivo | Qué es | ¿Se edita? |
|---|---|---|
| `picks_log.csv` | Una fila por pick publicado: partido, liga, mercado, línea, casa, cuota (decimal y americana), prob_modelo, prob_implicita_sin_margen, método de margen, EV, etiqueta, grado de calibración, motor, hora de publicación (UTC), id ESPN. Columnas `resultado`, `cuota_cierre`, `clv` existen pero **siempre vacías aquí**. | **No.** Solo se añaden filas al final. |
| `picks_log_actualizaciones.csv` | Resultado, marcador, cuota de cierre (+ fuente) y CLV de cada pick, por `id`. | **No.** Solo se añaden filas. |
| `picks_log_vista.csv` | Derivado = log + última actualización de cada id. Es el que se lee. | Se regenera solo. |

**Sello:** cada fila lleva `hash = sha256(hash_prev | columnas)`; la primera parte de `0…0`. Cambiar o borrar una fila anterior rompe la cadena.
Comprobar: `cd /workspace/futbol_metodo/07_Plantilla && python3 -c "from valor import picks_log as P; print(P.verificar())"`.

**Fórmulas**
- Prob. implícita sin margen: método **proporcional** (p_i = (1/c_i) / Σ 1/c_j sobre el mercado completo de la misma casa). `valor/cuotas.py` trae también Shin.
- EV = prob_modelo × cuota_decimal − 1. Se publica solo con EV > 4 % (y ≤ 30 %), cuota 1.63–3.00, liga×mercado en lista blanca, máx. 1 por partido y 8 por día.
- CLV = cuota_publicada / cuota_cierre − 1. Cierre = cuota de cierre DraftKings en ESPN (solo 1, X, 2 y total principal). Si no hay cierre real, `cuota_cierre` y `clv` quedan **vacíos** con nota “sin cierre público”; nunca se rellenan.
- Resultado: `gana`, `pierde`, `nulo` (push), `media_gana`/`media_pierde` (líneas asiáticas), `pospuesto`, vacío = pendiente.

**Quién escribe:** `valor/valor_dia.py --publicar` (añade picks antes del inicio) y `valor/calificar_valor.py` (añade actualizaciones tras el partido). Ninguna otra herramienta debe tocar estos archivos.
Los picks anteriores al 26-oct (sistema por % sin cuota) **no** están aquí; su acierto/ROI/CLV está en `_historial/historial.json` y en la página Historial.
