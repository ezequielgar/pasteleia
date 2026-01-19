# 🚀 Deployment a Vercel - Instrucciones Paso a Paso

## ✅ Preparación Completada

Todos los archivos están listos para el deployment:
- ✅ Variables de entorno configuradas
- ✅ Número de WhatsApp actualizado: **+54 9 381 463-7258**
- ✅ Credenciales de Supabase verificadas
- ✅ Configuración de Vercel creada

---

## 📋 Pasos para Deployar en Vercel

### Paso 1: Crear cuenta en Vercel

1. Ve a [vercel.com/signup](https://vercel.com/signup)
2. Click en **"Continue with GitHub"**
3. Autoriza a Vercel para acceder a tus repositorios

### Paso 2: Importar el Proyecto

1. En el dashboard de Vercel, click en **"Add New..."** → **"Project"**
2. Busca y selecciona tu repositorio: **`ezequielgar/pasteleia`**
3. Click en **"Import"**

### Paso 3: Configurar el Proyecto

Vercel detectará automáticamente que es Next.js. Configura lo siguiente:

**Framework Preset:** `Next.js` ✅ (auto-detectado)

**Build Command:** `npm run build` ✅ (auto-detectado)

**Output Directory:** `.next` ✅ (auto-detectado)

### Paso 4: Configurar Variables de Entorno

En la sección **"Environment Variables"**, agrega estas 3 variables:

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xgykpmlkajxljybtpoqi.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhneWtwbWxrYWp4bGp5YnRwb3FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNTY1MjIsImV4cCI6MjA4MzkzMjUyMn0.3-7Imn9cvWkduNeuj849MnCGkyDh9d4EwdM0cfNrFcs` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `5493814637258` |

**Importante:** Asegúrate de que las tres variables sean para **Production**, **Preview**, y **Development**.

### Paso 5: Deploy

1. Click en **"Deploy"**
2. Espera 2-3 minutos mientras Vercel construye y despliega tu aplicación
3. ¡Listo! 🎉

---

## 🌐 Después del Deploy

Una vez completado, Vercel te dará:
- **URL de producción**: `https://pasteleia-xxx.vercel.app`
- **Dominio automático**: Se puede personalizar después

### Configurar Supabase para Producción

1. Ve a [app.supabase.com](https://app.supabase.com)
2. Abre tu proyecto → **Settings** → **Authentication** → **URL Configuration**
3. En **Site URL**, agrega tu nueva URL de Vercel: `https://tu-proyecto.vercel.app`
4. En **Redirect URLs**, agrega:
   - `https://tu-proyecto.vercel.app/**`

---

## ✅ Checklist Post-Deploy

Después de deployar, verifica:

- [ ] La página principal carga correctamente
- [ ] Los productos se muestran (conexión a Supabase funciona)
- [ ] El carrito funciona
- [ ] El logo animado en navbar funciona
- [ ] El loading screen de productos funciona
- [ ] Los links de WhatsApp abren correctamente con el nuevo número
- [ ] El favicon aparece en la pestaña del navegador
- [ ] El sitio funciona en mobile

---

## 🔄 Deploys Automáticos

A partir de ahora:
- ✅ Cada push a `main` → Deploy automático a producción
- ✅ Cada PR → Preview deployment automático
- ✅ Rollback instantáneo si algo falla

---

## 💡 Siguiente Paso Opcional: Dominio Personalizado

Si querés usar tu propio dominio (ej: `pasteleia.com.ar`):

1. En Vercel: **Settings** → **Domains**
2. Agrega tu dominio
3. Configura los DNS según las instrucciones de Vercel

---

## 📞 URLs Importantes

- **Dashboard Vercel**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Supabase Dashboard**: [app.supabase.com](https://app.supabase.com)
- **Documentación Vercel**: [vercel.com/docs](https://vercel.com/docs)

---

## 🆘 Troubleshooting

### Error: "Build Failed"
- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs de build en Vercel

### Error: "Productos no se cargan"
- Verifica las credenciales de Supabase
- Asegúrate de agregar la URL de Vercel en Supabase URL Configuration

### WhatsApp no funciona
- Verifica el formato del número: `5493814637258` (sin espacios ni guiones)
