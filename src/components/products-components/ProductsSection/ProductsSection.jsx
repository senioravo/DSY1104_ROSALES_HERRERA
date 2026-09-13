import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Fade from 'react-bootstrap/Fade';
import ProductCard from '../ProductCard/ProductCard';
import './ProductsSection.css';

export default function ProductsSection({ products }) {
    const [visibleCards, setVisibleCards] = useState([]);

    // Efecto para mostrar cards proceduralmente
    useEffect(() => {
        // Reset cuando cambian los productos
        setVisibleCards([]);

        // Mostrar cada card con delay de 200ms
        products.forEach((product, index) => {
            setTimeout(() => {
                setVisibleCards(prev => [...prev, product.code]);
            }, index * 200); // 0.2s = 200ms
        });

        // Cleanup: limpiar timeouts si el componente se desmonta
        return () => {
            setVisibleCards([]);
        };
    }, [products]); // Re-ejecutar cuando cambien los productos

    if (products.length === 0) {
        return (
            <div className="no-products">
                <h3>No se encontraron productos</h3>
                <p>Intenta con otros filtros o búsqueda</p>
            </div>
        );
    }

    return (
        <section className="products-section">
            <div className="products-header">
                <h2 className="products-title">Nuestros Productos</h2>
                <p className="products-count">{products.length} producto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}</p>
            </div>

            <Row xs={1} md={2} lg={3} className="g-4">
                {products.map((product) => (
                    <Col key={product.code}>
                        <Fade in={visibleCards.includes(product.code)} timeout={300}>
                            <div>
                                <ProductCard product={product} />
                            </div>
                        </Fade>
                    </Col>
                ))}
            </Row>
        </section>
    );
}
