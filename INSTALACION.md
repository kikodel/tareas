# Panel de Tareas — Deploy en Vercel

Esta versión reemplaza el backend de Netlify Blobs por **Vercel Blob**, para que funcione en tu proyecto `tareas-six-xi.vercel.app` (o el nombre que le hayas puesto en Vercel).

## Estructura del proyecto

```
panel-tareas-vercel/
├── index.html          ← la app completa (frontend), se sirve como página estática
├── api/
│   └── tasks.js         ← función serverless (Node) que guarda/lee tareas en Vercel Blob
├── package.json          ← dependencia @vercel/blob
└── .gitignore
```

## 1. Reemplazar el contenido del repo de GitHub

En tu repo `kikodel/tareas`, reemplazá todo el contenido (el `.tar.gz` y el `INSTALACION.md` viejo) por los archivos de esta carpeta: `index.html`, `api/tasks.js`, `package.json`, `.gitignore` y este mismo archivo.

Podés hacerlo de dos formas:

**Opción A — con git (si tenés el repo clonado):**
```bash
cd tareas
git rm -r --cached .
cp -r /ruta/a/panel-tareas-vercel/* .
cp -r /ruta/a/panel-tareas-vercel/.gitignore .
git add -A
git commit -m "Migrar backend a Vercel Blob"
git push
```

**Opción B — subiendo los archivos desde la web de GitHub:**
1. Entrá a https://github.com/kikodel/tareas
2. Borrá `panel-tareas-para-compartir.tar.gz` (⋯ → Delete file)
3. "Add file" → "Upload files" → arrastrá `index.html`, `package.json`, `.gitignore` y la carpeta `api/`
4. Commit directo a `main`

## 2. Crear el Blob Store en Vercel

1. Andá a tu proyecto en Vercel → pestaña **Storage**
2. **Create Database** → elegí **Blob**
3. Access: **Public** (así el frontend puede recuperar el JSON directamente)
4. Conectalo al proyecto `tareas` cuando te lo pida (esto agrega la variable de entorno `BLOB_READ_WRITE_TOKEN` automáticamente)

## 3. Redeploy

Con el nuevo código en `main` y el Blob store conectado, Vercel va a redeployar solo. Si no, andá a **Deployments** → **Redeploy** en el último commit.

## Cómo usarlo

- Abrí `https://tareas-six-xi.vercel.app` (o tu dominio de Vercel). Arranca vacío, sin tareas ni clientes predefinidos.
- **Botón ⚙ (arriba a la derecha)** → agregá tus proyectos y clientes antes de cargar tareas.
- **Botón "+ Nueva tarea"** → para sumar tareas.
- 3 vistas: **Proyecto** (Kanban), **Prioridad** (tarjetas agrupadas), **Fecha** (calendario de 2 semanas, sin fines de semana).
- Cada tarea puede tener subtareas con su propio estado (Pendiente / En curso / Seguimiento / Hecha) y fecha propia.
- Los datos se guardan en Vercel Blob, así que vas a ver lo mismo entrando desde cualquier compu, siempre que abras la misma URL.

## Si necesitás hacer cambios después

Si en el futuro querés pedirle ajustes a Claude (nuevas funciones, cambios de diseño), el flujo es:
1. Claude te da un `index.html` actualizado (y/o `api/tasks.js` si el cambio toca el guardado de datos)
2. Reemplazás esos archivos en el repo de GitHub
3. Vercel redeploya automáticamente al detectar el push a `main`

## Soporte

Esta app fue armada con Claude (Anthropic). Si necesitás extenderla, podés pegarle este archivo y el `index.html` a Claude y pedirle los cambios que necesites.
