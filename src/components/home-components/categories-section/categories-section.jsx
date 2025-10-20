import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './categories-section.css';
import { CATEGORIES_PS, getFeaturedCategories } from '../../../data/categorias';
import { Link } from 'react-router';

export default function CategoriesSection() {
    // Obtener las 3 categorías destacadas (PG, PI, PSA)
    const featuredCategories = CATEGORIES_PS.filter(category => 
        ['PG', 'PI', 'PSA'].includes(category.id)
    );

    // Función helper para cargar imágenes dinámicamente
    const getCategoryImage = (imageName) => {
        try {
            return new URL(`../../../assets/categories/${imageName}`, import.meta.url).href;
        } catch (error) {
            console.error(`Error loading image: ${imageName}`, error);
            return null;
        }
    };

    return (
        <section className="categories-section py-5" id="categories">
            <Container>
                <h2 className="section-title text-center mb-5">Categorías Destacadas</h2>
                <Row className="g-4">
                    {featuredCategories.map((category) => (
                        <Col xs={12} md={4} key={category.id}>
                            <div className="category-card">
                                <img 
                                    src={getCategoryImage(category.imagen)} 
                                    alt={category.nombre} 
                                    className="category-image" 
                                />
                                <h3 className="category-title mt-3">{category.nombre}</h3>
                                <p className="category-description">{category.descripcion}</p>
                                <Button 
                                    as={Link}
                                    to={`/productos?categoria=${category.id}`}
                                    className="primary-button" 
                                    variant="primary"
                                >
                                    Ver Más
                                </Button>
                            </div>
                        </Col>
                    ))}
                </Row>

                <Row>
                    <div className='view-all-categories-div'>
                        <Link to="/productos" id="view-all-categories" className="primary-button">
                            Ver todas las categorías
                        </Link>
                    </div>
                    
                </Row>
            </Container>
        </section>
    );
}