import React, { useState, useEffect } from 'react';
import { Offcanvas, Button, ListGroup, Badge } from 'react-bootstrap';
import { Cart3, Trash, Plus, Dash } from 'react-bootstrap-icons';
import { cartService } from '../../../services/cartService';
import './Cart.css';

export default function CarritoLateral() {
  const [mostrar, setMostrar] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [userLoginVisible, setUserLoginVisible] = useState(false);

  const handleCerrar = () => setMostrar(false);
  const handleMostrar = () => setMostrar(true);

  // Cargar carrito al montar y cuando se actualice
  useEffect(() => {
    loadCart();
    
    // Escuchar eventos de actualización del carrito
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    // Escuchar eventos del popover de usuario
    const handleUserLoginToggle = (event) => {
      setUserLoginVisible(event.detail.show);
    };
    window.addEventListener('userLoginToggle', handleUserLoginToggle);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('userLoginToggle', handleUserLoginToggle);
    };
  }, []);

  const loadCart = () => {
    const cart = cartService.getCart();
    setCartItems(cart);
  };

  const handleIncrement = (productCode) => {
    const item = cartItems.find(i => i.code === productCode);
    if (item && item.quantity < item.stock) {
      cartService.updateQuantity(productCode, item.quantity + 1);
      loadCart();
    }
  };

  const handleDecrement = (productCode) => {
    const item = cartItems.find(i => i.code === productCode);
    if (item && item.quantity > 1) {
      cartService.updateQuantity(productCode, item.quantity - 1);
      loadCart();
    }
  };

  const handleRemove = (productCode) => {
    cartService.removeFromCart(productCode);
    loadCart();
  };

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      cartService.clearCart();
      loadCart();
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

  const total = cartService.getCartTotal();
  const itemCount = cartService.getCartItemCount();

  return (
    <>
      {/* 🔘 Icono del carrito - se oculta cuando el offcanvas está abierto o cuando el user login está visible */}
      {!mostrar && !userLoginVisible && (
        <Button 
          onClick={handleMostrar} 
          id="cart-button"
          variant="primary"
        >
          <Cart3 size={20}/>
          {itemCount > 0 && (
            <Badge bg="danger" className="cart-badge">
              {itemCount}
            </Badge>
          )}
        </Button>
      )}

      {/* 🛒 Ventana lateral del carrito */}
      <Offcanvas show={mostrar} onHide={handleCerrar} placement="end" className="cart-offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tu Carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <Cart3 size={60} className="mb-3 text-muted" />
              <p>No hay productos en el carrito.</p>
            </div>
          ) : (
            <>
              <ListGroup variant="flush" className="cart-items-list">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.code} className="cart-item">
                    <div className="cart-item-content">
                      <img 
                        src={getProductImage(item.imagen)} 
                        alt={item.nombre}
                        className="cart-item-image"
                      />
                      <div className="cart-item-details">
                        <h6 className="cart-item-name">{item.nombre}</h6>
                        <p className="cart-item-price">${item.precioCLP.toLocaleString('es-CL')}</p>
                        
                        <div className="cart-item-controls">
                          <button 
                            className="cart-qty-btn"
                            onClick={() => handleDecrement(item.code)}
                            disabled={item.quantity <= 1}
                          >
                            <Dash />
                          </button>
                          <span className="cart-qty">{item.quantity}</span>
                          <button 
                            className="cart-qty-btn"
                            onClick={() => handleIncrement(item.code)}
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus />
                          </button>
                          <button 
                            className="cart-remove-btn"
                            onClick={() => handleRemove(item.code)}
                          >
                            <Trash />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="cart-item-subtotal">
                      ${(item.precioCLP * item.quantity).toLocaleString('es-CL')}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="cart-footer">
                <div className="cart-total">
                  <h5>Total:</h5>
                  <h4>${total.toLocaleString('es-CL')}</h4>
                </div>
                
                <Button 
                  variant="success" 
                  className="w-100 mb-2 checkout-btn"
                  size="lg"
                >
                  Finalizar compra
                </Button>
                
                <Button 
                  variant="outline-danger" 
                  className="w-100 clear-cart-btn"
                  onClick={handleClearCart}
                >
                  Vaciar carrito
                </Button>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}