# Viota - Generador de Minutas con IA

## 🚀 Migración a Vercel completada

Backend migrado de Azure Functions a Vercel Serverless Functions.

## 📁 Estructura del Proyecto

```
Viota/
├── api/                    # Vercel Serverless Functions
│   ├── procesarJson.ts    # Endpoint de generación de minutas
│   └── package.json
├── frontend/              # React + Vite
├── vercel.json           # Configuración de Vercel
└── .env.example          # Variables de entorno de ejemplo
```

## 🛠️ Setup Local

### 1. Instalar dependencias

```bash
# API
cd api
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configurar variables de entorno

Copia `.env.example` a `.env` y añade tu API key de OpenAI:

```bash
cp .env.example .env
```

Edita `.env`:
```
OPENAI_API_KEY=sk-tu-clave-aqui
```

### 3. Desarrollo local con Vercel CLI

```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Ejecutar en modo desarrollo
vercel dev
```

Esto levantará:
- Frontend: `http://localhost:3000`
- API: `http://localhost:3000/api/procesarJson`

## 📤 Deployment a Vercel

### Primera vez

```bash
# Login en Vercel
vercel login

# Deploy
vercel
```

### Configurar variable de entorno en Vercel

1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Settings → Environment Variables
3. Añade: `OPENAI_API_KEY` con tu clave de OpenAI
4. Redeploy el proyecto

### Deployments siguientes

```bash
# Deploy a producción
vercel --prod
```

## 🔧 Comandos útiles

```bash
# Frontend (desarrollo)
cd frontend
npm run dev

# Build del frontend
npm run build

# API local (requiere Vercel CLI)
vercel dev
```

## 🌐 URLs

- **Desarrollo**: `http://localhost:3000`
- **Producción**: Se generará automáticamente en Vercel (ejemplo: `https://viota-xxxx.vercel.app`)

## 📝 Notas

- El backend en `backend-azure/` ya no es necesario y puede eliminarse después de confirmar que todo funciona
- La API ahora está en la carpeta `/api` y se despliega automáticamente con Vercel
- El frontend consume la API en la ruta relativa `/api/procesarJson`
