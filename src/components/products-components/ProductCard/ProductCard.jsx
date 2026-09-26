import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import { Cart3 } from 'react-bootstrap-icons';
import { cartService } from '../../../services/cartService';
import ProductInfoOverlay from './ProductInfoOverlay';
import './ProductCard.css';

export default function ProductCard({ product }) {
    const [quantity, setQuantity] = useState(1);
    const [cartMessage, setCartMessage] = useState(null);
    const [adding, setAdding] = useState(false);

    const handleIncrement = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = async () => {
        setCartMessage(null);
        setAdding(true);
        try {
            await cartService.addToCart(product, quantity);
            setQuantity(1);
            setCartMessage({ variant: 'success', text: `${product.nombre} agregado al carrito.` });
        } catch (error) {
            setCartMessage({
                variant: 'warning',
                text: error.message || 'No se pudo agregar al carrito.',
            });
        } finally {
            setAdding(false);
        }
    };

    const getProductImage = (imageName) => {
        try {
            return new URL(`../../../assets/products/${imageName}`, import.meta.url).href;
        } catch (error) {
            console.error(`Error loading image: ${imageName}`, error);
            return null;
        }
    };

    return (
        <Card className="product-card-item">
            <div className="product-image-container">
                <Card.Img 
                    variant="top" 
                    src={getProductImage(product.imagen)} 
                    alt={product.nombre}
                    className="product-card-image"
                />
                <ProductInfoOverlay description={product.descripcion} />
                {product.stock <= 5 && product.stock > 0 && (
                    <Badge bg="warning" className="stock-badge">
                        ¡Últimas {product.stock} unidades!
                    </Badge>
                )}
                {product.stock === 0 && (
                    <Badge bg="danger" className="stock-badge">
                        Sin stock
                    </Badge>
                )}
                {product.personalizable && (
                    <Badge className="customizable-badge">
                        Personalizable
                    </Badge>
                )}
            </div>
            
            <Card.Body className="product-card-body">
                <Card.Title className="product-card-title">{product.nombre}</Card.Title>
                
                <div className="product-tags">
                    {product.etiquetas.map((tag, index) => (
                        <Badge key={index} bg="secondary" className="product-tag">
                            {tag}
                        </Badge>
                    ))}
                </div>

                <div className="product-card-price">
                    ${product.precioCLP.toLocaleString('es-CL')}
                </div>

                {cartMessage && (
                    <Alert variant={cartMessage.variant} className="py-2 small mb-2">
                        {cartMessage.text}
                    </Alert>
                )}

                {product.stock > 0 && (
                    <div className="cart-controls-row">
                        <div className="quantity-controls-card">
                            <button 
                                className="quantity-btn"
                                onClick={handleDecrement}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span className="quantity-display-card">{quantity}</span>
                            <button 
                                className="quantity-btn"
                                onClick={handleIncrement}
                                disabled={quantity >= product.stock}
                            >
                                +
                            </button>
                        </div>

                        <Button 
                            variant="primary" 
                            className="add-to-cart-btn-inline"
                            onClick={handleAddToCart}
                            disabled={adding}
                        >
                            <Cart3 size={20} />
                        </Button>
                    </div>
                )}

                {product.stock === 0 && (
                    <Button 
                        variant="secondary" 
                        className="add-to-cart-btn"
                        disabled
                    >
                        Sin stock disponible
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
}
