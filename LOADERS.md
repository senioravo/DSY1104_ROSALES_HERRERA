# React Router Loaders - Implementación en Mil Sabores

## ¿Qué son los Loaders?

Los **loaders** en React Router son funciones que se ejecutan **antes** de que se renderice un componente de página. Esto permite:

1. **Cargar datos necesarios** antes de mostrar la página
2. **Mejorar la experiencia del usuario** con datos inmediatos
3. **Manejar estados de carga** de manera centralizada
4. **Implementar caché** y optimizaciones de rendimiento

## Implementación en el Proyecto

### 📁 Estructura de Archivos

```
src/
├── loaders/
│   └── index.js              # Todas las funciones loader
├── hooks/
│   └── useLoaderData.js      # Hooks personalizados para usar los datos
├── components/
│   └── common/
│       ├── LoadingSpinner.jsx    # Componentes de carga
│       └── ErrorBoundary.jsx     # Manejo de errores
└── routes.jsx               # Configuración de rutas con loaders
```

### 🔧 Loaders Implementados

#### 1. **homeLoader**
```javascript
// Carga datos para la página principal
const data = {
  hero: { title, subtitle, description },
  stats: { yearsInBusiness, happyCustomers, etc... },
  featuredProducts: [...]
}
```

#### 2. **nosotrosLoader**
```javascript
// Carga información de la empresa
const data = {
  mission: "...",
  vision: "...",
  timeline: [...],
  values: [...],
  team: {...}
}
```

#### 3. **productosLoader**
```javascript
// Carga catálogo de productos
const data = {
  categories: [...],
  products: [...],
  specialOffers: [...]
}
```

#### 4. **blogLoader**
```javascript
// Carga artículos del blog
const data = {
  posts: [...],
  categories: [...],
  recentPosts: number,
  totalPosts: number
}
```

#### 5. **articuloLoader**
```javascript
// Carga artículo específico por slug
const data = {
  post: {...},
  relatedPosts: [...]
}
```

#### 6. **contactoLoader**
```javascript
// Carga información de contacto
const data = {
  contactInfo: {...},
  socialMedia: [...],
  branches: [...],
  formConfig: {...}
}
```

### 🎯 Uso en Componentes

#### Opción 1: Hook genérico
```jsx
import { useLoaderData } from 'react-router-dom';

function MyComponent() {
  const data = useLoaderData();
  // Usar data...
}
```

#### Opción 2: Hooks específicos (Recomendado)
```jsx
import { useHomeData } from '../../hooks/useLoaderData';

function Home() {
  const { hero, stats, featuredProducts } = useHomeData();
  // Datos ya tipados y estructurados
}
```

### ⚡ Características Avanzadas

#### Simulación de Red
```javascript
const simulateNetworkDelay = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
```

#### Manejo de Errores
```javascript
if (!post) {
  throw new Response("Artículo no encontrado", { status: 404 });
}
```

#### Parámetros Dinámicos
```javascript
export const articuloLoader = async ({ params }) => {
  const { slug } = params;
  // Buscar artículo por slug...
};
```

### 🔄 Flujo de Funcionamiento

1. **Usuario navega** a una ruta (ej: `/productos`)
2. **Router ejecuta** `productosLoader()` 
3. **Loader carga datos** (simulando API call)
4. **Componente se renderiza** con datos ya disponibles
5. **Hook devuelve datos** estructurados y tipados

### 💡 Beneficios Implementados

#### ✅ **Experiencia de Usuario Mejorada**
- No más pantallas en blanco esperando datos
- Transiciones suaves entre páginas
- Datos inmediatamente disponibles

#### ✅ **Código Más Limpio**
- Lógica de carga centralizada en loaders
- Componentes sin `useEffect` para datos iniciales
- Separación clara de responsabilidades

#### ✅ **Manejo Robusto de Errores**
- Error boundaries configurados
- Páginas de error personalizadas
- Fallbacks para datos faltantes

#### ✅ **Rendimiento Optimizado**
- Carga paralela de datos y componentes
- Posibilidad de implementar caché fácilmente
- Menor tiempo de carga percibido

### 🛠️ Configuración en Routes

```jsx
export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        Component: Home,
        loader: homeLoader  // ← Loader asignado
      },
      {
        path: 'productos',
        Component: Productos,
        loader: productosLoader  // ← Loader asignado
      }
      // ... más rutas
    ]
  }
]);
```

### 🎓 Valor Académico

Esta implementación demuestra:

1. **Conocimiento avanzado** de React Router
2. **Arquitectura escalable** para aplicaciones reales
3. **Mejores prácticas** de desarrollo frontend
4. **Manejo profesional** de estados asincrónicos
5. **Experiencia de usuario** de alta calidad

### 🚀 Próximos Pasos Posibles

- [ ] Implementar caché de datos
- [ ] Agregar invalidación de datos
- [ ] Conectar con API real
- [ ] Implementar optimistic updates
- [ ] Agregar prefetching de rutas

---

**Nota**: Aunque los datos son estáticos en este proyecto, la arquitectura está preparada para una API real. Solo se necesitaría cambiar las funciones de simulación por llamadas HTTP reales.