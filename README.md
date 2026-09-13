# 🎂 Mil Sabores - Pastelería Web Application

## 🔗 Repositorios del proyecto

| Componente | Repositorio |
|------------|-------------|
| **Frontend** | https://github.com/senioravo/DSY1104_ROSALES_HERRERA |
| **Backend** | https://github.com/senioravo/Backend_MilSabores_Rosales_Herrera |

## 🌿 Flujo de ramas

- `main` — código estable listo para entrega
- `develop` — integración del equipo
- `feature/*` — desarrollo por tarea (ej. `feature/setup-repos`)

<div align="center">

![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.8-646CFF?logo=vite)
![React Router](https://img.shields.io/badge/React_Router-7.9.3-CA4245?logo=react-router)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952B3?logo=bootstrap)
![License](https://img.shields.io/badge/License-MIT-green)

Una aplicación web moderna y profesional para la pastelería "Mil Sabores", construida con **React 19**, **Vite** y **React Router** con implementación avanzada de **Data Loaders**.

[Demo](#) · [Documentación](#documentación-técnica) · [Instalación](#instalación-y-uso)

</div>

---

## 📋 Tabla de Contenidos

- [Características Principales](#características-principales)
- [Tecnologías](#tecnologías-implementadas)
- [Instalación y Uso](#instalación-y-uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Páginas Implementadas](#páginas-implementadas)
- [Sistema de Loaders](#sistema-de-loaders)
- [Componentes](#componentes-principales)
- [Datos y Arquitectura](#datos-y-arquitectura)
- [Testing](#testing)
- [Paleta de Colores](#paleta-de-colores-mil-sabores)
- [Scripts Disponibles](#scripts-disponibles)
- [Valor Académico](#valor-académico)
- [Contribución](#contribución)

---

## ✨ Características Principales

### 🚀 React Router Loaders
- **Carga de datos anticipada** antes del renderizado de componentes
- **Experiencia de usuario optimizada** con estados de carga elegantes
- **Manejo robusto de errores** con error boundaries personalizados
- **Arquitectura escalable** preparada para APIs REST reales
- **Simulación de latencia de red** para testing realista

### 🎨 Diseño y UX
- **Paleta de colores personalizada** "Mil Sabores" (Strawberry, Vanilla, Caramel, Chocolate, Lemon, Mint)
- **Diseño responsive** para todos los dispositivos
- **Navegación intuitiva** con navbar fijo y animaciones suaves
- **Footer completo** con enlaces, redes sociales e información de contacto
- **Scroll automático** al cambiar de página con animación de 1 segundo
- **Componentes reutilizables** con React Bootstrap

### 🛒 Funcionalidades E-commerce
- **Catálogo de productos** con filtros y categorías
- **Personalizador de tortas** interactivo
- **Carrito de compras** funcional
- **Sistema de autenticación** con localStorage
- **Formulario de contacto** con validación

---

## 🛠️ Tecnologías Implementadas

### Frontend Core
| Tecnología | Versión | Uso |
|------------|---------|-----|
| **React** | 19.1.1 | Framework principal con hooks avanzados |
| **Vite** | 7.1.8 | Build tool ultra-rápida con HMR |
| **React Router** | 7.9.3 | Navegación SPA con data loaders |
| **React Bootstrap** | 2.10.10 | Componentes UI responsive |
| **Bootstrap** | 5.3.8 | Framework CSS base |
| **Bootstrap Icons** | 1.13.1 | Sistema de iconografía |

### Testing & Quality
| Herramienta | Versión | Propósito |
|-------------|---------|-----------|
| **Jasmine** | 5.12.0 | Framework de testing |
| **Karma** | 6.4.4 | Test runner |
| **Testing Library** | 16.3.0 | Testing de componentes React |
| **ESLint** | 9.36.0 | Linter de código |
| **Babel** | 7.28.4 | Transpilador JS |

### DevOps & Build
- **JSDOM** 27.0.1 - Simulación de DOM para tests
- **CSS Loader** 7.1.2 - Procesamiento de CSS
- **Karma Coverage** 2.2.1 - Reportes de cobertura

---

## 📦 Instalación y Uso

### Prerrequisitos
- Node.js >= 18.0.0
- npm >= 9.0.0

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/senioravo/DSY1104_ROSALES_HERRERA.git
cd DSY1104_ROSALES_HERRERA

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### Acceso Local
La aplicación estará disponible en: `http://localhost:5173`

---

## 📁 Estructura del Proyecto

```
DSY1104_ROSALES_HERRERA/
│
├── public/                    # Archivos públicos estáticos
│   ├── images/               # Imágenes de productos, héroes, etc.
│   └── favicon.ico
│
├── src/
│   ├── assets/               # Recursos del código fuente
│   │   └── react.svg
│   │
│   ├── components/           # Componentes reutilizables
│   │   ├── root/            # Layout principal (Navbar, Footer)
│   │   │   ├── NavBarRoot.jsx
│   │   │   ├── FooterRoot.jsx
│   │   │   ├── cart/        # Componentes del carrito
│   │   │   └── user/        # Componentes de usuario
│   │   │
│   │   ├── common/          # Componentes compartidos
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── UniversalHero.jsx
│   │   │
│   │   ├── home-components/ # Componentes de página Home
│   │   │   ├── Hero/
│   │   │   ├── categories-section/
│   │   │   ├── highlights-section/
│   │   │   └── blog-section/
│   │   │
│   │   ├── BlogComponents/  # Componentes del Blog
│   │   │   ├── BlogHero.jsx
│   │   │   ├── BlogCard.jsx
│   │   │   ├── ArticleHeader.jsx
│   │   │   ├── CategoryFilter.jsx
│   │   │   └── BackButton.jsx
│   │   │
│   │   ├── NosotrosComponents/  # Componentes Nosotros
│   │   │   ├── NosotrosHero.jsx
│   │   │   ├── MissionSection.jsx
│   │   │   ├── ValuesSection.jsx
│   │   │   └── TimelineSection.jsx
│   │   │
│   │   ├── ContactoComponents/  # Componentes Contacto
│   │   │   ├── ContactForm.jsx
│   │   │   ├── ContactInfo.jsx
│   │   │   └── FormValidation.js
│   │   │
│   │   ├── products-components/  # Componentes Productos
│   │   │   ├── ProductCard/
│   │   │   ├── ProductsMenu/
│   │   │   └── ProductsSection/
│   │   │
│   │   └── personalize-components/  # Personalización
│   │       └── PersonalizeForm.jsx
│   │
│   ├── data/                # Datos estructurados (JSON/JS)
│   │   ├── blogArticles.js  # Artículos del blog
│   │   ├── productos.js     # Catálogo de productos
│   │   ├── categorias.js    # Categorías de productos
│   │   ├── contacto.json    # Datos de contacto
│   │   ├── sucursales.json  # Información de sucursales
│   │   ├── timeline.json    # Historia de la empresa
│   │   ├── valores.json     # Valores corporativos
│   │   └── mision.json      # Misión y visión
│   │
│   ├── loaders/             # React Router Loaders
│   │   ├── index.js         # Exportaciones centralizadas
│   │   ├── homeLoader.jsx   # Loader página principal
│   │   ├── blogLoader.jsx   # Loader del blog
│   │   ├── articuloLoader.jsx
│   │   ├── contactoLoader.jsx
│   │   ├── nosotrosLoader.jsx
│   │   ├── productsLoader.jsx
│   │   └── personalizeLoader.jsx
│   │
│   ├── pages/               # Páginas principales
│   │   ├── root.jsx         # Layout raíz
│   │   ├── root.css         # Estilos globales + paleta
│   │   ├── home/
│   │   ├── blog/
│   │   ├── nosotros/
│   │   ├── contacto/
│   │   ├── productos/
│   │   ├── personaliza-tu-torta/
│   │   ├── checkout/
│   │   ├── register/
│   │   └── mensajes-contacto/
│   │
│   ├── services/            # Servicios y utilidades
│   │   └── authService.js   # Servicio de autenticación
│   │
│   ├── hooks/               # Custom React Hooks
│   │   └── (hooks personalizados)
│   │
│   ├── tests/               # Archivos de prueba
│   │   └── components/
│   │
│   ├── routes.jsx           # Configuración de rutas
│   ├── main.jsx            # Punto de entrada React
│   └── index.css           # Estilos base
│
├── .babelrc                # Configuración Babel
├── karma.conf.cjs          # Configuración Karma
├── vite.config.js          # Configuración Vite
├── eslint.config.js        # Configuración ESLint
├── package.json            # Dependencias y scripts
└── README.md               # Este archivo
```

---

## 🌐 Páginas Implementadas

### 🏠 **Home** (`/`)
- Hero section dinámico con call-to-action
- Sección de categorías destacadas (6 categorías)
- Productos destacados (4 productos en stock)
- Últimos 3 artículos del blog
- **Loader:** `homeLoader` - Carga categorías, productos destacados y artículos recientes

### 👥 **Nosotros** (`/nosotros`)
- Hero personalizado con imagen corporativa
- Misión y visión de la empresa
- Timeline interactivo de historia empresarial
- Sección de valores corporativos con iconos
- **Loader:** `nosotrosLoader` - Carga datos desde JSON (timeline, misión, valores)

### 🛍️ **Productos** (`/productos`)
- Catálogo completo de productos (279 productos)
- Sistema de filtros avanzado:
  - Por categoría (TC, TT, PI, PSA, PT, PG, PV, TE)
  - Por características dietéticas (sin gluten, vegano, sin lactosa)
  - Por disponibilidad (solo disponibles)
  - Por personalización
- Búsqueda por nombre
- Cards de producto con información detallada
- **Loader:** `productsLoader` - Carga productos y categorías

### 🎨 **Personaliza tu Torta** (`/personaliza-tu-torta`)
- Formulario interactivo para personalización
- Selección de tamaño, sabor y decoración
- Solo muestra productos personalizables en stock
- Validación de formulario en tiempo real
- **Loader:** `personalizeLoader` - Filtra productos personalizables

### 📝 **Blog** (`/blog`)
- Lista de artículos con imágenes
- Sistema de categorías (Consejos, Recetas, Noticias)
- Artículo destacado en hero
- Vista de artículo individual con slug
- **Loaders:** 
  - `blogLoader` - Carga todos los artículos y categorías
  - `articuloLoader` - Carga artículo específico por slug

### 📞 **Contacto** (`/contacto`)
- Formulario de contacto con validación
- Información de sucursales
- Datos de contacto (teléfono, email, dirección)
- Integración con localStorage
- **Loader:** `contactoLoader` - Carga sucursales y opciones de asunto

### 🛒 **Otras Páginas**
- **Checkout** (`/checkout`) - Carrito de compras
- **Register** (`/register`) - Registro de usuarios
- **Mensajes Contacto** (`/mensajes-contacto`) - Historial de mensajes

---

## 🔄 Sistema de Loaders

### ¿Qué son los Loaders?

Los **React Router Loaders** son funciones que cargan datos **antes** de renderizar una página, proporcionando:
- ✅ Datos listos al momento del render
- ✅ Mejor experiencia de usuario (sin pantallas vacías)
- ✅ Manejo centralizado de carga y errores
- ✅ Código más limpio y mantenible

### Loaders Implementados

```javascript
// src/loaders/index.js
export { homeLoader } from './homeLoader.jsx';
export { blogLoader } from './blogLoader.jsx';
export { articuloLoader } from './articuloLoader.jsx';
export { contactoLoader } from './contactoLoader.jsx';
export { nosotrosLoader } from './nosotrosLoader.jsx';
export { productsLoader } from './productsLoader.jsx';
export { personalizeLoader } from './personalizeLoader.jsx';
```

### Ejemplo de Implementación

**homeLoader.jsx:**
```javascript
import { CATEGORIES_PS } from '../data/categorias';
import { PRODUCTS_PS } from '../data/productos';
import { blogArticles } from '../data/blogArticles';

export async function homeLoader() {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    categories: CATEGORIES_PS.slice(0, 6),
    highlightedProducts: PRODUCTS_PS.filter(p => p.stock > 0).slice(0, 4),
    recentArticles: blogArticles.slice(0, 3),
    heroMessage: "Descubre los sabores más deliciosos"
  };
}
```

**Uso en routes.jsx:**
```javascript
{
  index: true,
  Component: Home,
  loader: homeLoader
}
```

### Ventajas de esta Arquitectura

1. **Separación de responsabilidades** - Lógica de datos separada de componentes
2. **Reutilización** - Un loader puede servir a múltiples rutas
3. **Testing sencillo** - Funciones puras fáciles de testear
4. **Preparado para APIs** - Solo cambiar la fuente de datos
5. **Error handling centralizado** - Error boundaries manejan fallos

---

## 🧩 Componentes Principales

### Layout Components (`src/components/root/`)

#### **NavBarRoot.jsx**
- Navbar fijo con scroll detection
- Animación hide/show al hacer scroll
- Sistema de variables CSS dinámicas
- Integración con carrito y usuario
- Responsive con hamburger menu

#### **FooterRoot.jsx**
- Footer completo con 4 columnas
- Enlaces a todas las páginas
- Redes sociales (Instagram, Facebook, WhatsApp)
- Información de contacto con iconos
- Horarios de atención
- Scroll animado al navegar (MPA con animación de 1s)

### Common Components (`src/components/common/`)

#### **ErrorBoundary.jsx**
- Captura errores de React
- Página de error personalizada
- Botón para volver al home

#### **LoadingSpinner.jsx**
- Spinner animado durante carga
- Usado por React Router automáticamente

#### **UniversalHero.jsx**
- Hero section reutilizable
- Props: title, subtitle, backgroundImage, height

---

## 📊 Datos y Arquitectura

### Sistema de Datos (`src/data/`)

#### **productos.js** (279 productos)
```javascript
export const PRODUCTS_PS = [
  {
    code: "TC001",
    nombre: "Torta Cuadrada de Chocolate",
    categoria: "TC",
    tamanosDisponibles: ["S (8 porciones)", "M (12 porciones)", "L (20 porciones)"],
    precioCLP: 45000,
    stock: 10,
    personalizable: true,
    descripcion: "Deliciosa torta de chocolate...",
    etiquetas: ["tradicional"]
  },
  // ... 278 productos más
];
```

#### **categorias.js** (8 categorías)
- TC: Tortas Cuadradas
- TT: Tortas Circulares
- PI: Postres Individuales
- PSA: Productos Sin Azúcar
- PT: Pastelería Tradicional
- PG: Productos Sin Gluten
- PV: Productos Veganos
- TE: Tortas Especiales

#### **blogArticles.js** (Artículos del blog)
```javascript
export const blogArticles = [
  {
    id: 1,
    slug: "secretos-masa-perfecta",
    titulo: "Los 5 secretos de una masa perfecta",
    categoria: "Consejos",
    imagen: "/images/blog/masa-perfecta.jpg",
    contenido: "...",
    fecha: "2024-01-15"
  },
  // ... más artículos
];
```

#### **Archivos JSON**
- `contacto.json` - Datos de contacto
- `sucursales.json` - Información de sucursales
- `timeline.json` - Historia empresarial
- `valores.json` - Valores corporativos
- `mision.json` - Misión y visión
- `opciones-asunto.json` - Opciones para formulario

---

## 🧪 Testing

### Suite de Testing Completa

**18+ archivos de pruebas** implementados con Jasmine/Karma:

#### Tests de Componentes
```
src/components/
├── BlogComponents/
│   ├── ArticleHeader.spec.js
│   ├── BlogCard.spec.js
│   ├── BlogHero.spec.js
│   ├── BackButton.spec.js
│   └── CategoryFilter.spec.js
│
├── NosotrosComponents/
│   ├── HeroSection.spec.js
│   ├── MissionSection.spec.js
│   ├── ValuesSection.spec.js
│   └── TimelineSection.spec.js
│
└── ContactoComponents/
    ├── ContactForm.spec.js
    ├── ContactFormAuth.spec.js
    ├── ContactInfo.spec.js
    └── ContactoHero.spec.js
```

#### Tests de Páginas
```
src/pages/
├── blog/
│   ├── blog.spec.js
│   └── articulo.spec.js
├── nosotros/
│   └── nosotros.spec.js
└── contacto/
    └── contacto.spec.js
```

#### Tests de Servicios
```
src/services/
└── authService.spec.js
```

### Ejecutar Tests

```bash
# Ejecutar todos los tests una vez
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con reporte de cobertura
npm run test:coverage

# Ejecutar tests en modo single-run
npm run test:single
```

### Configuración Karma

```javascript
// karma.conf.cjs
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    browsers: ['jsdom'],
    files: ['src/**/*.spec.js'],
    preprocessors: {
      'src/**/*.js': ['babel'],
      'src/**/*.jsx': ['babel']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    }
  });
};
```

---

## 🎨 Paleta de Colores "Mil Sabores"

Paleta personalizada definida en `src/pages/root.css`:

### Colores Principales

| Color | Variable CSS | Hex | Uso |
|-------|-------------|-----|-----|
| 🍓 **Strawberry** | `--strawberry` | `#E5ADA8` | Primario, CTA, enlaces |
| 🍦 **Vanilla** | `--vanilla` | `#E5E0D8` | Fondos claros, texto sobre oscuro |
| 🍯 **Caramel** | `--caramel` | `#D0A77B` | Acentos cálidos, iconos |
| 🍫 **Chocolate** | `--chocolate` | `#725C3F` | Texto principal, secundario |
| 🍋 **Lemon** | `--lemon` | `#EFE8D8` | Fondo body, fondos suaves |
| 🌿 **Mint** | `--mint` | `#D8D7B2` | Éxito, confirmaciones |

### Variantes de Cada Color

Cada color tiene 5 variantes:
- `base` - Color principal
- `-light` - 20% más claro
- `-lighter` - 40% más claro
- `-dark` - 20% más oscuro
- `-darker` - 40% más oscuro
- `-emphasis` - Versión de énfasis

### Ejemplo de Uso

```css
.button-primary {
  background-color: var(--strawberry);
  color: var(--vanilla-lighter);
  border: 2px solid var(--strawberry-dark);
}

.button-primary:hover {
  background-color: var(--strawberry-emphasis);
  box-shadow: 0 4px 8px var(--strawberry-light);
}
```

---

## 🚀 Scripts Disponibles

### Desarrollo

```bash
# Iniciar servidor de desarrollo con HMR
npm run dev
# Acceder a: http://localhost:5173

# Build para producción
npm run build

# Preview del build de producción
npm run preview
```

### Testing

```bash
# Ejecutar tests una vez
npm test

# Tests en modo watch (auto-recarga)
npm run test:watch

# Tests con coverage report
npm run test:coverage

# Tests en modo single-run (CI/CD)
npm run test:single
```

### Calidad de Código

```bash
# Ejecutar ESLint
npm run lint
```

---

## 🎓 Valor Académico

Este proyecto demuestra competencias en:

### Desarrollo Frontend Moderno
✅ **Arquitectura SPA** con React Router  
✅ **State Management** con hooks (useState, useEffect, useRef, useNavigate, useLocation)  
✅ **Component Design** reutilizable y escalable  
✅ **CSS Avanzado** con variables, animaciones y responsive design  
✅ **Performance Optimization** con lazy loading y code splitting  

### Buenas Prácticas
✅ **Separación de responsabilidades** (loaders, components, pages, data)  
✅ **Clean Code** con nombres descriptivos y comentarios  
✅ **Error Handling** con ErrorBoundary  
✅ **Testing** con Jasmine/Karma (18+ specs)  
✅ **Git Workflow** con commits descriptivos  

### UX/UI Design
✅ **Diseño responsive** mobile-first  
✅ **Navegación intuitiva** con feedback visual  
✅ **Animaciones suaves** para mejor experiencia  
✅ **Paleta de colores coherente** y profesional  
✅ **Accesibilidad** con HTML semántico  

### Preparación para Producción
✅ **Build optimizado** con Vite  
✅ **Code splitting** automático  
✅ **Asset optimization** (imágenes, CSS, JS)  
✅ **SEO-ready** con meta tags y estructura semántica  
✅ **Escalable** para integración con APIs REST  

---

## 🤝 Contribución

### Estructura de Commits

```
tipo(scope): descripción corta

Descripción detallada del cambio

Fixes #123
```

**Tipos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (CSS, espacios)
- `refactor`: Refactorización de código
- `test`: Añadir o modificar tests
- `chore`: Cambios en build, dependencias

### Proceso de Desarrollo

1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commits atómicos con mensajes descriptivos
4. Push a tu fork: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request con descripción detallada

---

## 📄 Licencia

Este proyecto fue desarrollado como parte de la evaluación académica para **DSY1104 - Duoc UC**.

**Situación Evaluativa:** Entrega por encargo  
**Curso:** Desarrollo de Aplicaciones Frontend  
**Institución:** Duoc UC  
**Año:** 2025  

---

## 👥 Autores

**Equipo Mil Sabores**
- Desarrollo: [Diego Herrera, Matías Rosales]
- Diseño UX/UI: Equipo de desarrollo
- Testing: Equipo de desarrollo

---

## 📞 Contacto y Soporte

**Pastelería Mil Sabores** (Ficticia - Proyecto Académico)

📍 Dirección: Av. Principal 1234, Santiago, Chile  
📞 Teléfono: +56 9 1234 5678  
📧 Email: contacto@milsabores.cl  

**Redes Sociales:**
- Instagram: [@milsabores](https://instagram.com/milsabores)
- Facebook: [/milsabores](https://facebook.com/milsabores)
- WhatsApp: [Contáctanos](https://web.whatsapp.com)

**Horario de Atención:**
- Lunes - Viernes: 9:00 - 19:00
- Sábado - Domingo: 10:00 - 18:00

---

## 🙏 Agradecimientos

- **Duoc UC** por la formación académica
- **React Team** por el excelente framework
- **Vite Team** por la herramienta de desarrollo
- **Bootstrap Team** por el framework CSS
- **Comunidad Open Source** por las librerías utilizadas

---

<div align="center">

**Desarrollado con ❤️ para endulzar tu día**

⭐ Si te gustó el proyecto, dale una estrella en GitHub ⭐

[⬆ Volver arriba](#-mil-sabores---pastelería-web-application)

</div>
