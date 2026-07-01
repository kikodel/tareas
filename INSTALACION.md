# Panel de Tareas — Guía de instalación

Este paquete contiene una app de gestión de tareas (React + Netlify Functions + Netlify Blobs) lista para desplegar en tu propia cuenta de Netlify. Cada persona que la despliega tiene su propio sitio, su propia URL y sus propios datos — no se comparte nada con la copia original.

## Requisitos previos

- Cuenta de [Netlify](https://netlify.com) (gratis)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/) instalado:
  ```bash
  npm install -g netlify-cli
  ```
- Node.js instalado (cualquier versión reciente)

## Estructura del paquete

```
panel-tareas/
├── public/
│   └── index.html          ← la app completa (frontend)
├── netlify/
│   └── functions/
│       └── tasks.js        ← función serverless que guarda/lee tareas
├── netlify.toml             ← configuración de Netlify
└── package.json             ← dependencias (Netlify Blobs)
```

## Pasos de instalación

### 1. Descomprimir y entrar a la carpeta

```bash
tar -xzf panel-tareas.tar.gz -d panel-tareas
cd panel-tareas
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Login en Netlify (si no lo hiciste antes)

```bash
netlify login
```

### 4. Crear el sitio

```bash
netlify init
```

Cuando pregunte:
- **"Do you want to create a Netlify project without a git repository?"** → elegí **"Yes, create and deploy project manually"**
- **Team** → tu cuenta
- **Project name** → el que quieras (ej: `mi-panel-tareas`)
- **Build command** → dejalo vacío, apretá Enter
- **Directory to deploy** → escribí `public`

### 5. Desplegar

```bash
netlify deploy --prod
```

Al terminar te va a dar una URL fija tipo `https://tu-proyecto.netlify.app` — esa es tu panel, ya funcionando.

## Cómo usarlo

- **Abrí la URL** que te dio el deploy. Arranca vacío, sin tareas ni clientes predefinidos.
- **Botón ⚙ (arriba a la derecha)** → ahí agregás tus propios proyectos y clientes antes de cargar tareas.
- **Botón "+ Nueva tarea"** → para sumar tareas.
- Tiene 3 vistas: **Proyecto** (tablero Kanban), **Prioridad** (tarjetas agrupadas), **Fecha** (calendario de 2 semanas, sin fines de semana).
- Cada tarea puede tener subtareas con su propio estado (Pendiente / En curso / Seguimiento / Hecha) y fecha propia.
- Los datos se guardan en la nube (Netlify Blobs), así que vas a ver lo mismo entrando desde cualquier compu, siempre que abras la misma URL.

## Si necesitás hacer cambios después

Si en el futuro querés pedirle ajustes a Claude (nuevas funciones, cambios de diseño, etc.), el flujo es:
1. Claude te da un `index.html` actualizado
2. Lo reemplazás dentro de `public/index.html`
3. Corrés `netlify deploy --prod` de nuevo desde la carpeta del proyecto

## Soporte

Esta app fue armada con Claude (Anthropic) en una serie de conversaciones. Si necesitás extenderla o modificarla, podés pegarle este mismo archivo `index.html` a Claude y pedirle los cambios que necesites — el código está comentado y estructurado para que sea fácil de entender y editar.
