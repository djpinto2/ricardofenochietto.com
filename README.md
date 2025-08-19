# Ricardo Fenochietto - Sitio Web Personal

Sitio web personal para Ricardo Fenochietto, economista argentino, autor y experto en política fiscal internacional.

## 🚀 Características

- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Arquitectura Sass**: Sistema de diseño modular y escalable
- **Performance**: CSS optimizado y comprimido para producción
- **Accesibilidad**: Cumple con estándares WCAG
- **SEO Optimizado**: Meta tags y estructura semántica

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica moderna
- **Sass/SCSS**: Preprocesador CSS con arquitectura modular
- **JavaScript**: Funcionalidades interactivas
- **Font Awesome**: Iconografía
- **Google Fonts**: Tipografías Inter y Playfair Display

## 📁 Estructura del Proyecto

```
entrega 2 trabajo ricardo/
├── scss/                          # Archivos Sass
│   ├── abstracts/                 # Variables, mixins y funciones
│   │   ├── _variables.scss       # Variables globales
│   │   ├── _mixins.scss          # Mixins reutilizables
│   │   └── _functions.scss       # Funciones personalizadas
│   ├── base/                      # Estilos base
│   │   ├── _reset.scss           # Reset CSS
│   │   ├── _typography.scss      # Tipografía
│   │   └── _utilities.scss       # Utilidades
│   ├── components/                # Componentes reutilizables
│   │   ├── _buttons.scss         # Botones
│   │   ├── _navigation.scss      # Navegación
│   │   ├── _cards.scss           # Tarjetas
│   │   ├── _tabs.scss            # Pestañas
│   │   └── _forms.scss           # Formularios
│   ├── layout/                    # Estructura de layout
│   │   ├── _header.scss          # Encabezado
│   │   ├── _hero.scss            # Sección hero
│   │   ├── _sections.scss        # Secciones generales
│   │   ├── _footer.scss          # Pie de página
│   │   └── _grid.scss            # Sistema de grid
│   ├── pages/                     # Estilos específicos de páginas
│   │   ├── _home.scss            # Página principal
│   │   ├── _about.scss           # Sección about
│   │   ├── _publications.scss    # Publicaciones
│   │   ├── _books.scss           # Libros
│   │   └── _contact.scss         # Contacto
│   ├── themes/                    # Temas y variantes
│   │   ├── _animations.scss      # Animaciones
│   │   ├── _responsive.scss      # Media queries
│   │   └── _print.scss           # Estilos de impresión
│   └── main.scss                  # Archivo principal (importa todo)
├── css/                           # CSS compilado (generado automáticamente)
├── images/                        # Imágenes del sitio
├── index.html                     # Página principal
├── script.js                      # JavaScript
├── package.json                   # Dependencias y scripts
└── README.md                      # Este archivo
```

## 🚀 Instalación y Uso

### Prerrequisitos

- **Node.js** (versión 14 o superior)
- **npm** (incluido con Node.js)

### Instalación

1. **Clona o descarga** el proyecto
2. **Instala las dependencias**:
   ```bash
   npm install
   ```

### Scripts Disponibles

#### Desarrollo
```bash
# Compila Sass en modo desarrollo (con source maps)
npm run dev

# Observa cambios en Sass y recompila automáticamente
npm run sass
```

#### Producción
```bash
# Compila Sass para producción (comprimido)
npm run build

# Solo compila Sass
npm run sass:build
```

## 🎨 Sistema de Diseño

### Variables CSS
El proyecto utiliza un sistema de variables CSS organizado en:

- **Colores**: Paleta de colores principal y secundarios
- **Tipografía**: Fuentes, tamaños y pesos
- **Espaciado**: Sistema de espaciado consistente
- **Breakpoints**: Puntos de quiebre responsivos
- **Sombras**: Sistema de sombras escalado
- **Transiciones**: Curvas de animación estándar

### Mixins
Mixins reutilizables para:

- **Media Queries**: `@include respond-to(md)`
- **Tipografía**: `@include heading-style($size)`
- **Layout**: `@include container($max-width)`
- **Componentes**: `@include button-base`
- **Efectos**: `@include hover-lift`

### Utilidades CSS
Clases utilitarias para:

- **Grid**: `.grid`, `.grid-cols-2`, `.grid-cols-3`
- **Flexbox**: `.flex`, `.flex-center`, `.justify-between`
- **Espaciado**: `.p-4`, `.m-2`, `.gap-4`
- **Tipografía**: `.text-center`, `.font-bold`, `.text-primary`
- **Display**: `.hidden`, `.block`, `.flex`

## 📱 Responsive Design

### Breakpoints
- **SM**: 480px (móviles pequeños)
- **MD**: 768px (tablets)
- **LG**: 1024px (laptops)
- **XL**: 1200px (desktops)
- **2XL**: 1400px (pantallas grandes)

### Uso de Mixins
```scss
@include respond-to(md) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
```

## 🔧 Personalización

### Cambiar Colores
Edita `scss/abstracts/_variables.scss`:
```scss
$primary-color: #2563eb;        // Color principal
$secondary-color: #64748b;      // Color secundario
$accent-color: #f59e0b;         // Color de acento
```

### Cambiar Tipografías
```scss
$font-primary: 'Inter', sans-serif;           // Fuente principal
$font-heading: 'Playfair Display', serif;     // Fuente de títulos
```

### Cambiar Espaciado
```scss
$spacing-xs: 0.25rem;   // 4px
$spacing-sm: 0.5rem;    // 8px
$spacing-md: 1rem;      // 16px
$spacing-lg: 1.5rem;    // 24px
$spacing-xl: 2rem;      // 32px
```

## 📦 Despliegue

### Hostinger (FTP)
1. Compila el proyecto: `npm run build`
2. Sube los archivos compilados a tu servidor
3. Asegúrate de subir: `index.html`, `css/`, `images/`, `script.js`

### GitHub Pages
1. Haz push a tu repositorio
2. Activa GitHub Pages en la configuración del repositorio
3. El sitio se desplegará automáticamente

## 🎯 Mejoras Implementadas

### Antes (CSS)
- Archivo CSS monolítico de 1173 líneas
- Variables CSS básicas
- Media queries repetitivas
- Código difícil de mantener

### Después (Sass)
- **Arquitectura modular** con 7 directorios organizados
- **Sistema de variables** completo y escalable
- **Mixins reutilizables** para patrones comunes
- **Utilidades CSS** tipo Tailwind
- **Media queries** centralizadas y consistentes
- **Código mantenible** y fácil de extender

## 📊 Beneficios del Sistema Sass

- ✅ **Mantenibilidad**: Código organizado y fácil de modificar
- ✅ **Reutilización**: Mixins y variables para consistencia
- ✅ **Escalabilidad**: Fácil agregar nuevos componentes
- ✅ **Performance**: CSS optimizado para producción
- ✅ **Colaboración**: Estructura clara para equipos
- ✅ **Responsive**: Sistema de breakpoints consistente

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Ricardo Fenochietto**
- Economista • Autor • Experto en Política Fiscal
- Especialista en IVA, finanzas públicas y política tributaria
- Más de 25 años de experiencia con el FMI

## 📞 Contacto

- **Sitio Web**: [ricardofenochietto.com](https://ricardofenochietto.com)
- **Google Scholar**: [Perfil académico](https://scholar.google.com/citations?hl=en&user=clgane4AAAAJ)
- **ResearchGate**: [Perfil de investigación](https://www.researchgate.net/profile/Ricardo-Fenochietto)

---

**Nota**: Este proyecto utiliza Sass para generar CSS optimizado. Asegúrate de compilar los archivos Sass antes de desplegar en producción. 