# ZinkERP Studio

Este es el estudio de Sanity para el sitio web de ZinkERP.

## Funcionalidades

### Contenido del Blog

El blog ahora soporta:

1. **Imágenes mejoradas** con:
   - Texto alternativo (alt) para accesibilidad
   - Captions opcionales
   - Hotspot para recorte inteligente

2. **Embeds de YouTube** con:
   - URL del video de YouTube
   - Título opcional del video
   - Renderizado responsivo en el frontend

## Cómo usar

### Agregar un video de YouTube

1. En el editor de contenido del post, haz clic en el botón "+" para agregar contenido
2. Selecciona "YouTube Video"
3. Pega la URL del video de YouTube (ej: https://www.youtube.com/watch?v=dQw4w9WgXcQ)
4. Opcionalmente, agrega un título para el video
5. Guarda el post

### Agregar imágenes con mejor información

1. En el editor de contenido, haz clic en el botón "+" para agregar contenido
2. Selecciona "Image"
3. Sube tu imagen
4. Agrega texto alternativo (importante para SEO y accesibilidad)
5. Opcionalmente, agrega un caption
6. Guarda el post

## Desarrollo

Para iniciar el estudio en modo desarrollo:

```bash
npm run dev
```

El estudio estará disponible en `http://localhost:3333`
