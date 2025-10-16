import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';
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
    const [filtro, setFiltro] = useState('Todos');

    const categorias = ['Todos', ...new Set(blogPosts.map(post => post.categoria))];

    const articulosFiltrados = filtro === 'Todos' 
        ? blogPosts 
        : blogPosts.filter(post => post.categoria === filtro);

    const handleClickArticulo = (slug) => {
        navigate(`/blog/${slug}`);
    };

    return (
        <Container className="py-5">
            {/* Header del Blog */}
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold text-brown mb-3">
                    Nuestro Blog de Pastelería
                </h1>
                <p className="lead text-muted">
                    Recetas, técnicas, historias y consejos para todos los amantes de la repostería
                </p>
            </div>

            {/* Filtros por categoría usando Bootstrap */}
            <div className="d-flex justify-content-center mb-5 flex-wrap gap-2">
                <ButtonGroup>
                    {categorias.map(cat => (
                        <Button
                            key={cat}
                            variant={filtro === cat ? 'primary' : 'outline-primary'}
                            onClick={() => setFiltro(cat)}
                            className="rounded-pill mx-1"
                            style={{
                                backgroundColor: filtro === cat ? '#F4A5C4' : 'transparent',
                                borderColor: '#F4A5C4',
                                color: filtro === cat ? 'white' : '#F4A5C4'
                            }}
                        >
                            {cat}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>

            {/* Grid de artículos usando Bootstrap */}
            <Row className="g-4">
                {articulosFiltrados.map(post => (
                    <Col key={post.id} xs={12} md={6} lg={4}>
                        <Card 
                            className="h-100 blog-card-bootstrap shadow-sm"
                            onClick={() => handleClickArticulo(post.slug)}
                            style={{ cursor: 'pointer', borderRadius: '20px', overflow: 'hidden' }}
                        >
                            <div style={{ position: 'relative' }}>
                                <Card.Img 
                                    variant="top" 
                                    src={post.imagen} 
                                    alt={post.titulo}
                                    style={{ height: '250px', objectFit: 'cover' }}
                                />
                                <span 
                                    className="position-absolute badge rounded-pill"
                                    style={{
                                        top: '1rem',
                                        left: '1rem',
                                        backgroundColor: '#F4A5C4',
                                        padding: '0.5rem 1rem',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {post.categoria}
                                </span>
                            </div>
                            <Card.Body className="d-flex flex-column" style={{ backgroundColor: '#FFF9F5' }}>
                                <Card.Title 
                                    className="fw-bold mb-3"
                                    style={{ color: '#6B4226', fontSize: '1.4rem' }}
                                >
                                    {post.titulo}
                                </Card.Title>
                                <Card.Text className="text-muted mb-3 flex-grow-1">
                                    {post.descripcion}
                                </Card.Text>
                                <Card.Text className="text-muted small">
                                    <small>{post.fecha}</small>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}