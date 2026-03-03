# 🚀 Guía Rápida - Ricardo Fenochietto Website

## 🔧 Comandos Esenciales

### Desarrollo diario
```bash
# Compilar y ver cambios en tiempo real
npm run sass

# Compilar para desarrollo (con source maps)
npm run dev
```

### Antes de subir a Hostinger
```bash
# Compilar para producción (optimizado)
npm run build

# Ver instrucciones de despliegue
./deploy.sh
```

### Limpieza
```bash
# Limpiar archivos generados
npm run clean
```

## 📁 Archivos Importantes

### Para personalizar tu sitio:
- **Colores**: `scss/abstracts/_variables.scss`
- **Tipografías**: `scss/abstracts/_variables.scss`
- **Espaciado**: `scss/abstracts/_variables.scss`

### Para subir a Hostinger:
- `index.html`
- `css/main.css` (generado automáticamente)
- `fonts/` (carpeta completa)
- `images/` (carpeta completa)
- `script.js`

## 🎨 Personalización Rápida

### Cambiar color principal:
```scss
// En scss/abstracts/_variables.scss
$primary-color: #2563eb;  // Cambia este color
```

### Cambiar tipografía:
```scss
// En scss/abstracts/_variables.scss
$font-primary: 'Inter', sans-serif;
$font-heading: 'Playfair Display', serif;
```

## 🚀 Workflow de Actualización

1. **Hacer cambios** en archivos Sass (carpeta `scss/`)
2. **Compilar**: `npm run build`
3. **Subir a Hostinger**: archivos de la lista de arriba
4. **¡Listo!** Tu sitio estará actualizado

## 📱 Estructura del Proyecto

```
scss/
├── abstracts/     # 🎨 Variables y mixins (para personalizar)
├── base/          # 📝 Tipografía y reset
├── components/    # 🧩 Botones, tarjetas, etc.
├── layout/        # 📐 Grid, header, footer
├── pages/         # 📄 Estilos específicos de cada sección
└── themes/        # 🎭 Animaciones y responsive
```

## ⚠️ Importante

- **NUNCA edites** `css/main.css` directamente
- **SIEMPRE edita** archivos en la carpeta `scss/`
- **SIEMPRE compila** con `npm run build` antes de subir

## 🆘 Solución de Problemas

### Si npm no funciona:
```bash
source ~/.zshrc
```

### Si hay errores de compilación:
```bash
npm run clean
npm install
npm run build
```

### Si las imágenes no cargan:
- Verifica que estén en la carpeta `images/`
- Comprueba que los nombres coincidan exactamente

## 🎯 Hostinger - Pasos de Subida

1. **Panel de control** → File Manager
2. **Ir a** `public_html/`
3. **Subir archivos**:
   - index.html
   - css/main.css
   - fonts/ (carpeta completa)
   - images/ (carpeta completa)
   - script.js
4. **¡Listo!** → ricardofenochietto.com

## 💡 Tips

- Usa `npm run sass` mientras desarrollas
- Compila con `npm run build` antes de subir
- Mantén backup de tu sitio actual
- Prueba localmente antes de subir

---

**📞 ¿Necesitas ayuda?** Consulta el README.md completo o pregunta al asistente. 