# ServiChile.cl - Verificación de Identidad y Auditoría Patrimonial

Website institucional para ServiChile, plataforma chilena de verificación oficial de identidad, auditoría patrimonial y prevención de fraudes.

## 🎯 Características

- **Diseño limpio y accesible**: Basado en el design system del proyecto ServicIA
- **Paleta de colores consistente**: Primary (#0f4c81), Accent (#c45c00), Secondary (#e8f1f8)
- **Responsive**: Mobile-first, compatible con todos los dispositivos
- **Blog dinámico**: Filtrable por categorías, busca por palabras clave
- **Precios transparentes**: Modelos B2C ($10k-$20k/mes) y B2B ($40k-$200k+/mes)
- **Sin dependencias**: HTML/CSS/JS vanilla, sin frameworks

## 📋 Páginas Incluidas

### Core Pages
- **index.html** - Homepage con hero, productos, social proof e impacto
- **productos.html** - ServicIA, DataCheck y PII Synthesizer (descripciones completas)
- **soluciones.html** - Segmentos de clientes: Personas mayores, Familias, Municipios, Empresas
- **precios.html** - Planes B2C/B2B con ROI calculator y FAQ
- **contacto.html** - Formulario, info de contacto, testimonios
- **blog.html** - Lista dinámica de artículos, filtrable y buscable

### Recursos
- **css/styles.css** - Sistema de diseño completo (1500+ líneas)
- **js/main.js** - Utilidades: validación, formateo, smooth scroll
- **post-template.html** - Template para nuevos posts de blog

## 🚀 Quick Start

### Opción 1: Local Development
```bash
cd /Users/nicolaspoblete/Desktop/serviChile.cl
python -m http.server 8000
# Abre http://localhost:8000 en tu navegador
```

### Opción 2: Descargar y Abrir
Descarga el repositorio y abre `index.html` directamente en tu navegador.

## 🎨 Design System

### Variables CSS (en styles.css)
```css
--color-primary: #0f4c81       /* Azul oscuro */
--color-accent: #c45c00        /* Naranja */
--color-secondary: #e8f1f8     /* Azul claro */
--color-success: #1e6f3e       /* Verde */
--font-size-base: 1rem         /* Responsive */
--space-md: 1rem               /* Espacios consistentes */
```

### Componentes Reutilizables
- `.btn`, `.btn-primary`, `.btn-secondary` - Botones
- `.card` - Tarjetas con hover effect
- `.pricing-card`, `.pricing-card.featured` - Tarjetas de precios
- `.hero`, `.section-header` - Secciones principales

## 💰 Precios (Configuración Actual)

### ServicIA (B2C)
| Plan | Precio | Consultas | Características |
|------|--------|-----------|-----------------|
| Individual | $10.000/mes | 100/mes | App personal, alertas |
| Familiar | $20.000/mes | 500/mes | 5 miembros, compartido |
| Residencia | $250.000+/mes | Escalable | Institucional, dedicado |

### DataCheck (B2B/API)
| Plan | Precio | Requests | SLA |
|------|--------|----------|-----|
| Starter | $40.000/mes | 3.000/mes | 99% |
| Professional | $100.000/mes | 30.000/mes | 99.5% |
| Enterprise | $200.000+/mes | Ilimitado | 99.99% |

**Modelo de costo**: ~$30 CLP infraestructura/consulta | Margen: 78-85%

## 📝 Contenido de Blog

4 Categorías (8 posts incluidos como ejemplo):
1. **Estafas Comunes** - Prevención y detección
2. **Tus Derechos** - Ley 21.719, acceso a datos
3. **Tutoriales** - Cómo consultar registros oficiales
4. **Casos Reales** - Historias de éxito de clientes

Todos los posts son filtrable y buscables desde `blog.html`.

## 🔧 Personalización

### Cambiar Colores
Edita `css/styles.css` en la sección `:root`:
```css
:root {
  --color-primary: #tu-azul;
  --color-accent: #tu-naranja;
  /* ... */
}
```

### Actualizar Info de Contacto
En `contacto.html`, busca:
- `info@servichile.cl` → tu email
- `+56912345678` → tu teléfono
- `Providencia, Santiago` → tu ubicación

### Agregar Posts al Blog
1. Abre `blog.html`
2. En el array `blogPosts`, añade un nuevo objeto:
```javascript
{
  id: 9,
  title: "Tu Título",
  excerpt: "Resumen del artículo...",
  category: "tutoriales",
  date: "2024-10-20",
  readtime: "5 min"
}
```

## 📊 Estructura de Archivos

```
serviChile.cl/
├── index.html              # Homepage
├── productos.html          # Descripción de productos
├── soluciones.html         # Soluciones por segmento
├── precios.html            # Planes y precios
├── contacto.html           # Contacto y formulario
├── blog.html               # Blog dinámico
├── post-template.html      # Template para posts individuales
├── css/
│   └── styles.css          # Sistema de diseño completo
├── js/
│   └── main.js             # Utilidades JavaScript
└── README.md               # Este archivo
```

## 🌐 Deployment

### Deploy en GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit: ServiChile website"
git remote add origin https://github.com/tu-usuario/serviChile.cl.git
git push -u origin main
```

Luego habilita GitHub Pages en los settings (rama `main`, carpeta `/root`).

### Deploy en Vercel / Netlify
Simplemente conecta tu repositorio de GitHub. El sitio se desplegará automáticamente en cada push.

## ✅ Checklist Antes de Lanzar

- [ ] Actualizar email de contacto (info@servichile.cl)
- [ ] Actualizar teléfono (+56912345678)
- [ ] Reemplazar testimonios con casos reales
- [ ] Configurar Google Analytics
- [ ] Configurar formulario de contacto (Formspree, Mailgun, etc.)
- [ ] Revisar todos los links internos
- [ ] Prueba responsividad en móvil
- [ ] Revisar SEO (meta tags, keywords)

## 🆘 Soporte

Para cambios o customización adicional, contacta a nicolaspoblete@gmail.com.

---

**Última actualización**: Octubre 17, 2024  
**Versión**: 2.0 (Rediseño con sistema ServiChile-PSA)  
**Licencia**: Privado
