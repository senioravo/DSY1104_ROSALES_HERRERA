# 🎣 Guía de Hooks de React - Proyecto DSY1104

**Proyecto:** Pastelería Web con React 19  
**Rama:** luisros  
**Fecha:** Octubre 2025

---

## 📋 Índice de Hooks Utilizados

1. [useState](#1-usestate---gestión-de-estado)
2. [useMemo](#2-usememo---optimización)
3. [useLoaderData](#3-useloaderdata---react-router)
4. [¿Por qué NO usamos useEffect?](#por-qué-no-usamos-useeffect)

---

## 1. useState - Gestión de Estado

### 📍 **Ubicaciones (5 usos totales)**

#### 1.1 ContactForm.jsx - Formulario de Contacto (3 estados)

**Archivo:** `src/components/root/ContactoComponents/ContactForm.jsx`

```javascript
import { useState } from 'react';

export default function ContactForm() {
    // ESTADO 1: Datos del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
    });

    // ESTADO 2: Errores de validación
    const [errors, setErrors] = useState({});

    // ESTADO 3: Mensaje de éxito
    const [exito, setExito] = useState('');

    // Manejo de cambios en inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Validación y envío
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validar campos
        const nuevosErrores = {};
        
        if (!validarNombre(formData.nombre)) {
            nuevosErrores.nombre = 'Nombre inválido';
        }
        
        if (Object.keys(nuevosErrores).length > 0) {
            setErrors(nuevosErrores);
            return;
        }
        
        // Éxito
        setExito('¡Mensaje enviado correctamente!');
        setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
        setErrors({});
    };
}
```

**Propósito:**
- ✅ Almacenar datos del formulario mientras el usuario escribe
- ✅ Mostrar errores de validación en tiempo real
- ✅ Mostrar mensaje de confirmación al enviar

---

#### 1.2 TimelineSection.jsx - Timeline Interactivo (1 estado)

**Archivo:** `src/components/root/NosotrosComponents/TimelineSection.jsx`

```javascript
import { useState } from 'react';

export default function TimelineSection() {
    // Control de tarjeta activa en el timeline
    const [activeCard, setActiveCard] = useState(0);

    const timelineData = [
        { year: "1995", title: "Los Inicios", ... },
        { year: "2005", title: "Expansión", ... },
        { year: "2015", title: "Modernización", ... },
        { year: "2025", title: "Era Digital", ... }
    ];

    return (
        <div className="timeline-container">
            {timelineData.map((item, index) => (
                <div 
                    key={index}
                    className={`timeline-item ${index === activeCard ? 'active' : ''}`}
                    onMouseEnter={() => setActiveCard(index)}
                >
                    <h3>{item.year}</h3>
                    <p>{item.title}</p>
                </div>
            ))}
        </div>
    );
}
```

**Propósito:**
- ✅ Controlar qué tarjeta está activa en el timeline (hover)
- ✅ Aplicar estilos diferentes a la tarjeta seleccionada
- ✅ Interactividad con hover del mouse

---

#### 1.3 Blog index.jsx - Filtro de Categorías (1 estado)

**Archivo:** `src/pages/blog/index.jsx`

```javascript
import { useState, useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';

export default function Blog() {
    const { articles, categories } = useLoaderData();
    
    // Estado del filtro de categoría
    const [filtro, setFiltro] = useState('Todos');

    // Cambio de filtro
    const handleCategoryChange = (categoria) => {
        setFiltro(categoria);
    };

    return (
        <main className="blog-page">
            <CategoryFilter 
                categories={categories}
                activeCategory={filtro}
                onCategoryChange={handleCategoryChange}
            />
            
            {/* Mostrar artículos filtrados */}
            <BlogGrid articles={articulosFiltrados} />
        </main>
    );
}
```

**Propósito:**
- ✅ Almacenar la categoría seleccionada
- ✅ Filtrar artículos según la categoría
- ✅ Actualizar vista cuando cambia el filtro

---

## 2. useMemo - Optimización

### 📍 **Ubicación (1 uso)**

**Archivo:** `src/pages/blog/index.jsx`

```javascript
import { useState, useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';

export default function Blog() {
    const { articles } = useLoaderData();
    const [filtro, setFiltro] = useState('Todos');

    // OPTIMIZACIÓN: Memoriza el resultado del filtrado
    const allBlogPosts = useMemo(() => {
        if (filtro === 'Todos') {
            return articles;
        }
        return articles.filter(article => article.categoria === filtro);
    }, [filtro, articles]); // Solo recalcula si filtro o articles cambian

    return (
        <main className="blog-page">
            <BlogGrid articles={allBlogPosts} />
        </main>
    );
}
```

### ❓ **¿Por qué usar useMemo aquí?**

**Sin useMemo (ineficiente):**
```javascript
// Se ejecuta en CADA render, incluso si filtro no cambió
const allBlogPosts = articles.filter(article => 
    filtro === 'Todos' ? true : article.categoria === filtro
);
```

**Con useMemo (eficiente):**
```javascript
// Solo se ejecuta cuando filtro o articles cambian
const allBlogPosts = useMemo(() => {
    // ... lógica de filtrado
}, [filtro, articles]);
```

**Ventajas:**
- ✅ Evita recálculos innecesarios
- ✅ Mejora el rendimiento
- ✅ Solo filtra cuando cambia el filtro o los artículos

---

## 3. useLoaderData - React Router

### 📍 **Ubicaciones (2 usos)**

#### 3.1 Blog index.jsx - Lista de Artículos

**Archivo:** `src/pages/blog/index.jsx`

```javascript
import { useLoaderData } from 'react-router-dom';

export default function Blog() {
    // Obtiene datos del blogLoader
    const { articles, categories } = useLoaderData();

    return (
        <main className="blog-page">
            <h1>Blog</h1>
            <p>Total de artículos: {articles.length}</p>
            <BlogGrid articles={articles} />
        </main>
    );
}
```

**Loader asociado (src/loaders/index.js):**
```javascript
export const blogLoader = async () => {
    // Simula delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
        articles: [...], // 12 artículos
        categories: ['Todas', 'Recetas', 'Consejos', 'Eventos', 'Técnicas']
    };
};
```

**Configuración en routes.jsx:**
```javascript
{
    path: 'blog',
    Component: Blog,
    loader: blogLoader  // React Router llama esto ANTES de renderizar
}
```

---

#### 3.2 Articulo.jsx - Artículo Individual

**Archivo:** `src/pages/blog/articulo.jsx`

```javascript
import { useLoaderData } from 'react-router-dom';

export default function Articulo() {
    // Obtiene datos del articuloLoader
    const { article } = useLoaderData();

    return (
        <main className="articulo-page">
            <ArticleHeader article={article} />
            <ArticleImage article={article} />
            
            <div className="article-content">
                <p>{article.contenido}</p>
            </div>
        </main>
    );
}
```

**Loader asociado (src/loaders/index.js):**
```javascript
export const articuloLoader = async ({ params }) => {
    const { slug } = params;
    
    const article = articles.find(a => a.slug === slug);
    
    if (!article) {
        throw new Response("Artículo no encontrado", { status: 404 });
    }
    
    return { article };
};
```

**Configuración en routes.jsx:**
```javascript
{
    path: 'blog/:slug',
    Component: Articulo,
    loader: articuloLoader  // Recibe el parámetro :slug
}
```

---

## ❌ ¿Por qué NO usamos useEffect?

### 🔴 **Forma Tradicional (NO la usamos)**

```javascript
import { useState, useEffect } from 'react';

export default function Blog() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch después del render
        fetch('/api/articles')
            .then(res => res.json())
            .then(data => {
                setArticles(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []); // Solo al montar

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return <div>{articles.map(...)}</div>;
}
```

**Problemas:**
- ❌ Requiere 3 estados (data, loading, error)
- ❌ Muestra spinner de carga
- ❌ Render inicial vacío
- ❌ Más código
- ❌ Experiencia de usuario pobre

---

### ✅ **Nuestra Forma (React Router Loaders)**

```javascript
import { useLoaderData } from 'react-router-dom';

export default function Blog() {
    // Los datos YA están cargados
    const { articles } = useLoaderData();
    
    // No hay loading state
    // No hay error state aquí (se maneja en ErrorBoundary)
    // Render inmediato con datos
    
    return <div>{articles.map(...)}</div>;
}
```

**Ventajas:**
- ✅ Datos cargados ANTES del render
- ✅ Sin estados de loading
- ✅ Código más limpio
- ✅ Mejor experiencia de usuario
- ✅ Manejo de errores centralizado

---

## 📊 Comparación: useEffect vs React Router Loaders

| Aspecto | useEffect | React Router Loaders |
|---------|-----------|---------------------|
| **Cuándo carga** | Después del render | Antes del render |
| **Estados necesarios** | 3 (data, loading, error) | 0 |
| **Código** | ~20 líneas | ~2 líneas |
| **Loading UI** | Requiere spinner | No necesario |
| **Experiencia UX** | Intermitente | Suave |
| **Usado en proyecto** | ❌ No | ✅ Sí |

---

## 🎯 Resumen de Hooks del Proyecto

```
📦 Hooks Utilizados (3 tipos)

├── useState (5 usos)
│   ├── ContactForm
│   │   ├── formData
│   │   ├── errors
│   │   └── exito
│   ├── TimelineSection
│   │   └── activeCard
│   └── Blog
│       └── filtro
│
├── useMemo (1 uso)
│   └── Blog
│       └── allBlogPosts (optimización de filtrado)
│
└── useLoaderData (2 usos)
    ├── Blog (lista de artículos)
    └── Articulo (artículo individual)
```

---

## 💡 Buenas Prácticas Aplicadas

1. **useState:**
   - ✅ Nombres descriptivos (`formData`, `activeCard`)
   - ✅ Estado inicial apropiado
   - ✅ Actualizaciones inmutables

2. **useMemo:**
   - ✅ Solo para operaciones costosas
   - ✅ Dependencias correctas
   - ✅ Mejora rendimiento real

3. **useLoaderData:**
   - ✅ Reemplaza useEffect para datos
   - ✅ Código más limpio
   - ✅ Mejor UX

4. **Evitar useEffect:**
   - ✅ No necesario para carga de datos
   - ✅ React Router Loaders es mejor
   - ✅ Menos bugs potenciales

---

## 🎓 Conclusión

Este proyecto demuestra el uso moderno de hooks de React:
- **useState** para estado local interactivo
- **useMemo** para optimización selectiva
- **useLoaderData** en lugar de useEffect
- Código limpio y mantenible

**Resultado:** Aplicación React moderna siguiendo las mejores prácticas de 2025. 🚀

---

*Documento generado: Octubre 2025*  
*Proyecto DSY1104 - React con Hooks Modernos*
