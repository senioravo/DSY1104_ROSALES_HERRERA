import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import BlogHeroNew from '../../components/blog-components/BlogHeroNew';
import { BlogGrid, CategoryFilter } from '../../components/root/BlogComponents';
import { useBlogData } from '../../hooks/useLoaderData';
import './blog.css';

// Datos de ejemplo de los artículos del blog
const blogPosts = [
  {
    id: 1,
    categoria: 'Decoración',
    titulo: 'Decoración con Frutas Frescas',
    descripcion: 'Ideas y consejos para decorar tus pasteles usando frutas de temporada y lograr un acabado profesional.',
    imagen: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800',
    fecha: '27-08-2025',
    slug: 'decoracion-frutas-frescas'
  },
  {
    id: 2,
    categoria: 'Receta',
    titulo: 'Receta: Pie de Limón Clásico',
    descripcion: 'El paso a paso definitivo para un pie de limón con merengue firme y base crocante.',
    imagen: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800',
    fecha: '21-08-2025',
    slug: 'pie-limon-clasico'
  },
  {
    id: 3,
    categoria: 'Historia',
    titulo: 'Historia del Queque Marmoleado',
    descripcion: 'Descubre el origen y curiosidades de este clásico de la pastelería casera.',
    imagen: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800',
    fecha: '14-08-2025',
    slug: 'historia-queque-marmoleado'
  },
  {
    id: 4,
    categoria: 'Técnica',
    titulo: 'Secretos del Merengue Perfecto',
    descripcion: 'Aprende los trucos profesionales para lograr un merengue estable y brillante.',
    imagen: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=800',
    fecha: '10-08-2025',
    slug: 'merengue-perfecto'
  },
  {
    id: 5,
    categoria: 'Receta',
    titulo: 'Torta de Chocolate Húmeda',
    descripcion: 'La receta definitiva para una torta de chocolate que se derrite en la boca.',
    imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    fecha: '05-08-2025',
    slug: 'torta-chocolate-humeda'
  },
  {
    id: 6,
    categoria: 'Decoración',
    titulo: 'Buttercream: Técnicas de Decoración',
    descripcion: 'Domina las técnicas básicas y avanzadas de decoración con buttercream.',
    imagen: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800',
    fecha: '01-08-2025',
    slug: 'buttercream-tecnicas'
  },
  {
    id: 7,
    categoria: 'Halloween',
    titulo: 'Cupcakes de Fantasmas Espeluznantes',
    descripcion: 'Deliciosos cupcakes de vainilla decorados como adorables fantasmitas para Halloween.',
    imagen: 'https://images.unsplash.com/photo-1599785209796-786432b228bc?w=800&q=80',
    fecha: '15-10-2025',
    slug: 'cupcakes-fantasmas-halloween'
  },
  {
    id: 8,
    categoria: 'Halloween',
    titulo: 'Galletas de Calabaza Especiadas',
    descripcion: 'Galletas suaves con especias de otoño y glaseado naranja perfectas para Halloween.',
    imagen: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    fecha: '14-10-2025',
    slug: 'galletas-calabaza-halloween'
  },
  {
    id: 9,
    categoria: 'Halloween',
    titulo: 'Torta Cementerio de Chocolate',
    descripcion: 'Una espeluznante torta de chocolate decorada como un cementerio terrorífico.',
    imagen: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80',
    fecha: '13-10-2025',
    slug: 'torta-cementerio-halloween'
  }
];

export default function Blog() {
    const navigate = useNavigate();
    
    // Estado para el filtro de categorías
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
    
    // Usar datos del loader (opcionales)
    const { posts: loaderPosts, categories: loaderCategories, totalPosts, recentPosts, hasLoaderData } = useBlogData();
    
    // Combinar datos: priorizar los originales, agregar loader como extra
    const allBlogPosts = useMemo(() => {
        // Siempre empezar con los datos originales
        let combinedPosts = [...blogPosts];
        
        // Solo agregar datos del loader si existen y no están vacíos
        if (hasLoaderData && loaderPosts.length > 0) {
            const loaderPostsFormatted = loaderPosts.map(post => ({
                id: post.id + 1000, // ID único para evitar conflictos
                categoria: post.category,
                titulo: post.title,
                descripcion: post.excerpt,
                imagen: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800',
                fecha: new Date(post.publishDate).toLocaleDateString('es-CL'),
                slug: post.slug
            }));
            
            // Añadir al final para mantener los originales primero
            combinedPosts = [...combinedPosts, ...loaderPostsFormatted];
        }
        
        return combinedPosts;
    }, [loaderPosts, hasLoaderData]);

    // Obtener categorías únicas
    const categorias = useMemo(() => {
        const uniqueCategories = [...new Set(allBlogPosts.map(post => post.categoria))];
        return ['Todas', ...uniqueCategories];
    }, [allBlogPosts]);

    // Filtrar posts por categoría
    const postsFiltrados = useMemo(() => {
        if (categoriaSeleccionada === 'Todas') {
            return allBlogPosts;
        }
        return allBlogPosts.filter(post => post.categoria === categoriaSeleccionada);
    }, [allBlogPosts, categoriaSeleccionada]);

    const handleClickArticulo = (slug) => {
        console.log('Navegando a artículo con slug:', slug);
        navigate(`/blog/${slug}`);
    };

    return (
        <main className="blog-page">
            <BlogHeroNew />
            
            <Container className="py-5">
                {/* Filtro de categorías */}
                <div className="d-flex justify-content-center mb-4">
                    <CategoryFilter 
                        categorias={categorias}
                        categoriaActiva={categoriaSeleccionada}
                        onCategoriaChange={setCategoriaSeleccionada}
                    />
                </div>
                
                {/* Grid de artículos */}
                <BlogGrid 
                    posts={postsFiltrados}
                    onPostClick={handleClickArticulo}
                />
            </Container>
        </main>
    );
}