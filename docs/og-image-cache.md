# Actualizar imagen destacada (OG) en redes sociales

Las redes cachean la vista previa por **URL exacta**. Aunque el sitio ya tenga la imagen correcta en el HTML, X (Twitter), Facebook, LinkedIn, etc. pueden seguir mostrando una versión vieja hasta que se fuerce una nueva lectura.

## Qué hacer cuando una URL muestra imagen vieja o sin imagen

1. **X (Twitter)**  
   - La vista previa de la tarjeta ya no está en el Card Validator; está en el **Tweet Composer** (al escribir un tweet).  
   - Pegar la URL en el compositor de un nuevo tweet para ver la tarjeta que se mostrará al compartir.  
   - Si ves imagen vieja o sin imagen: X cachea por URL; a veces al publicar de nuevo con la URL actualizada se refresca. No hay herramienta pública para forzar re-scrape como antes.

2. **Facebook / Meta**  
   - Ir a: https://developers.facebook.com/tools/debug/  
   - Pegar la misma URL y usar "Depurar" / "Scrape Again".

Hacerlo **por cada URL** que quieras que muestre la imagen nueva (home, /recursos, /modulos/, /modulos/almacen/, etc.).

## Recomendación

- Compartir siempre con la **misma forma de URL** (por ejemplo siempre `https://zinkerp.com` para la home y `https://zinkerp.com/modulos/` con barra final para módulos).
- Así se evita tener muchas variantes cacheadas (con/sin barra, con/sin www).
