# Hogar La Presencia de Jehová

Sitio web para un hogar de cuido de envejecientes y personas con diversidad
funcional. Diseñado para transmitir **seguridad, calidez, dignidad y confianza**.

> **Misión:** Dar cuidado y comprensión a la población envejeciente y personas con
> diversidad funcional, validando sus sentimientos y emociones, respetando sus
> experiencias de vida, y fomentando su independencia y dignidad.
>
> **Visión:** Que cada residente sea atendido en salud física y emocional, y se
> integre a la sociedad y a su familia, para sentirse feliz, pleno y seguro.

## Estructura

| Archivo | Descripción |
|---|---|
| `index.html` | Página principal (una sola página con secciones). |
| `styles.css` | Estilos: paleta cálida, tipografía y diseño responsivo. |
| `script.js` | Menú móvil, animaciones al hacer scroll y año del pie. |
| `assets/logo.svg` | Emblema del hogar (águila, libro, cruz y ramas de olivo). |

## Ver el sitio localmente

Abre `index.html` en tu navegador, o levanta un servidor local:

```bash
python3 -m http.server 8000
# luego visita http://localhost:8000
```

## Publicar en GitHub Pages

1. Sube estos archivos a la rama del repositorio.
2. En GitHub ve a **Settings → Pages**.
3. En **Source** selecciona **Deploy from a branch**.
4. Elige la rama (por ejemplo `main`) y la carpeta `/ (root)`, y guarda.
5. En unos minutos el sitio estará disponible en
   `https://<usuario>.github.io/<repositorio>/`.

## Personalización rápida

- **Logo oficial:** el sitio usa `assets/logo.svg` (una interpretación del logo en
  la paleta de la marca). Si prefieres usar tu imagen oficial, coloca tu archivo
  como `assets/logo.png` y reemplaza `assets/logo.svg` por `assets/logo.png` en las
  etiquetas `<img>` de `index.html`.
- **Datos de contacto:** edita el teléfono, correo y dirección en la sección
  `#contacto` de `index.html`.
- **Colores:** ajusta las variables al inicio de `styles.css` (`:root`).

## Nota sobre el formulario de contacto

GitHub Pages sirve contenido estático, por lo que el formulario usa un enlace
`mailto:` como opción sencilla. Para recibir mensajes de forma más confiable puedes
conectar un servicio gratuito como [Formspree](https://formspree.io) cambiando el
atributo `action` del `<form>`.
