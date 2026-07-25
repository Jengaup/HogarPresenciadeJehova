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

## Cómo añadir el logo oficial

El sitio busca primero `assets/logo.jpeg` y, si no existe, muestra el emblema
`assets/logo.svg` como respaldo. Para usar tu logo oficial solo tienes que subir
el archivo con el nombre exacto **`assets/logo.jpeg`**:

1. En GitHub abre el repositorio y entra a la carpeta `assets`.
2. Pulsa **Add file → Upload files**.
3. Arrastra tu logo, renómbralo a `logo.jpeg` y confirma (**Commit changes**).

Aparecerá automáticamente en el encabezado, el hero y el pie de página. (Si tu
archivo es `.png` o `.jpg`, súbelo con ese nombre y ajusta la extensión en las
etiquetas `<img>` de `index.html`.)

## Cómo añadir las fotos del carrusel

Sube las fotos del hogar a la carpeta **`assets/fotos/`** con estos nombres:
`foto1.jpg`, `foto2.jpg`, `foto3.jpg`, `foto4.jpg`, `foto5.jpg`
(ver `assets/fotos/LEEME.txt` para recomendaciones de tamaño). Mientras no
existan, el carrusel muestra un marcador con el nombre del archivo que falta.

## Personalización rápida

- **Datos de contacto:** teléfono, correo, dirección y enlace del mapa están en
  la sección `#contacto` y en el pie de `index.html`.
- **Textos de las fotos:** edita `slide-caption` en cada foto del carrusel.
- **Colores:** ajusta las variables al inicio de `styles.css` (`:root`).

## Nota sobre el formulario de contacto

GitHub Pages sirve contenido estático, por lo que el formulario usa un enlace
`mailto:` como opción sencilla. Para recibir mensajes de forma más confiable puedes
conectar un servicio gratuito como [Formspree](https://formspree.io) cambiando el
atributo `action` del `<form>`.
