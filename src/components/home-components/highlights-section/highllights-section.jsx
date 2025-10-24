import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './highlights-section.css';
import { PRODUCTS_PS } from '../../../data/productos';
import { cartService } from '../../../services/cartService';

export default function HighlightsSection() {
    // Seleccionar productos destacados (TC001, TC002, PI001)
    const featuredProducts = PRODUCTS_PS.filter(product => 
        ['TC001', 'TC002', 'PI001'].includes(product.code)
    );

    // Inicializar cantidades para cada producto
    const initialQuantities = {};
    featuredProducts.forEach(product => {
        initialQuantities[product.code] = 1;
    });

    const [quantities, setQuantities] = useState(initialQuantities);

    const handleIncrement = (productCode) => {
        setQuantities(prev => ({
            ...prev,
            [productCode]: prev[productCode] + 1
        }));
    };

    const handleDecrement = (productCode) => {
        setQuantities(prev => ({
            ...prev,
            [productCode]: prev[productCode] > 1 ? prev[productCode] - 1 : 1
        }));
    };

    const handleAddToCart = (product) => {
        try {
            // Agregar producto al carrito usando el servicio
            cartService.addToCart(product, quantities[product.code]);
            
            // Mensaje de confirmación opcional
            console.log(`✅ Agregado al carrito: ${quantities[product.code]} unidad(es) de ${product.nombre}`);
            
            // Resetear la cantidad a 1 después de agregar
            setQuantities(prev => ({
                ...prev,
                [product.code]: 1
            }));
            
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
        }
    };

    // Función helper para cargar imágenes dinámicamente
    const getProductImage = (imageName) => {
        try {
            return new URL(`../../../assets/products/${imageName}`, import.meta.url).href;
        } catch (error) {
            console.error(`Error loading image: ${imageName}`, error);
            return null;
        }
    };

    return (
        <section className="highlights-section py-5" id="highlights">
            <Container>
                <h2 className="section-title text-center mb-5">Productos Destacados</h2>
                <Row className="g-4">
                    {featuredProducts.map((product) => (
                        <Col xs={12} md={4} key={product.code}>
                            <div className="product-card">
                                <img 
                                    src={getProductImage(product.imagen)} 
                                    alt={product.nombre} 
                                    className="product-image" 
                                />
                                <h3 className="product-title mt-3">{product.nombre}</h3>
                                <div id="product-price-container">
                                    <p className="product-price">${product.precioCLP.toLocaleString('es-CL')}</p>
                                </div>
                                <p className="product-description">{product.descripcion}</p>
                                
                                <div className="quantity-controls">
                                    <button 
                                        className="quantity-button"
                                        onClick={() => handleDecrement(product.code)}
                                    >
                                        -
                                    </button>
                                    <span className="quantity-display">{quantities[product.code]}</span>
                                    <button 
                                        className="quantity-button"
                                        onClick={() => handleIncrement(product.code)}
                                    >
                                        +
                                    </button>
                                </div>
                                
                                <Button 
                                    className="add-to-cart-button mt-3" 
                                    variant="primary"
                                    onClick={() => handleAddToCart(product)}
                                    disabled={product.stock === 0}
                                >
                                    {product.stock > 0 ? 'Agregar' : 'Sin Stock'}
                                </Button>
                                
                                {product.stock > 0 && product.stock <= 5 && (
                                    <p className="stock-warning">¡Solo quedan {product.stock} unidades!</p>
                                )}
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}
