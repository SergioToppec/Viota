# 🚀 Guía Rápida de Deployment a Vercel

## Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

## Paso 2: Login en Vercel

```bash
vercel login
```

## Paso 3: Deploy (primera vez)

```bash
cd C:\Users\sergi\OneDrive\Documentos\Trabajo\Minutas\Viota
vercel
```

Responde las preguntas:
- Set up and deploy? → **Y**
- Which scope? → Selecciona tu cuenta
- Link to existing project? → **N**
- Project name? → **viota** (o el que prefieras)
- Directory? → **./frontend**
- Override settings? → **N**

## Paso 4: Configurar Variable de Entorno

1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto **viota**
3. Settings → Environment Variables
4. Añade:
   - Name: `OPENAI_API_KEY`
   - Value: `tu-clave-de-openai`
   - Environments: ✓ Production, ✓ Preview, ✓ Development

## Paso 5: Redeploy

```bash
vercel --prod
```

## ✅ Listo!

Tu app estará disponible en: `https://viota-[tu-usuario].vercel.app`

## 🔄 Deployments futuros

Cada vez que hagas push a GitHub, Vercel hará deploy automáticamente si conectas el repo.

O manualmente:
```bash
vercel --prod
```

## 🧪 Testing local

```bash
vercel dev
```

Abre http://localhost:3000
