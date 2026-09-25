import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './categories-section.css';
import { CATEGORIES_PS } from '../../../data/categorias';
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
        <section className="categories-section" id="categories">
            <Container>
                <header className="categories-header">
                    <span className="categories-eyebrow">Para cada necesidad</span>
                    <h2 className="categories-title">Categorías Destacadas</h2>
                </header>

                <Row className="g-4 justify-content-center">
                    {featuredCategories.map((category) => (
                        <Col xs={12} sm={10} md={4} key={category.id}>
                            {/* Toda la card es un único enlace a la categoría */}
                            <Link
                                to={`/productos?categoria=${category.id}`}
                                className="category-card"
                            >
                                <div className="category-media">
                                    <img
                                        src={getCategoryImage(category.imagen)}
                                        alt=""
                                        className="category-image"
                                        loading="lazy"
                                        decoding="async"
                                        width="1024"
                                        height="1024"
                                    />
                                </div>
                                <div className="category-body">
                                    <h3 className="category-title">{category.nombre}</h3>
                                    <p className="category-description">{category.descripcion}</p>
                                    <span className="category-cta" aria-hidden="true">
                                        Ver productos <span className="category-cta-arrow">→</span>
                                    </span>
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>

                <div className="view-all-categories-div">
                    <Link to="/productos" id="view-all-categories">
                        Ver todas las categorías
                    </Link>
                </div>
            </Container>
        </section>
    );
}
