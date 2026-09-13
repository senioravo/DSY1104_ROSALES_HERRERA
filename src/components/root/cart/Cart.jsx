import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Offcanvas, Button, ListGroup, Badge } from 'react-bootstrap';
import { Cart3, Trash, Plus, Dash } from 'react-bootstrap-icons';
import { cartService } from '../../../services/cartService';
import './Cart.css';

export default function CarritoLateral() {
  const navigate = useNavigate();
  const [mostrar, setMostrar] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [userLoginVisible, setUserLoginVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);

  const handleCerrar = () => {
    setMostrar(false);
    // Ocultar el botón inmediatamente cuando se cierra el cart
    setButtonVisible(false);
    // Mostrar el botón después de 0.5 segundos con transición
    setTimeout(() => {
      setButtonVisible(true);
    }, 500);
  };
  
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

  const loadCart = async () => {
    const cart = await cartService.getCart();
    setCartItems(cart || []);
  };

  const handleIncrement = async (itemId) => {
    const item = cartItems.find(i => i.id === itemId);
    if (item && item.cantidad < item.stockDisponible) {
      await cartService.updateQuantity(item.id, item.cantidad + 1);
      loadCart();
    }
  };

  const handleDecrement = async (itemId) => {
    const item = cartItems.find(i => i.id === itemId);
    if (item && item.cantidad > 1) {
      await cartService.updateQuantity(item.id, item.cantidad - 1);
      loadCart();
    }
  };

  const handleRemove = async (itemId) => {
    await cartService.removeFromCart(itemId);
    loadCart();
  };

  const handleClearCart = async () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      await cartService.clearCart();
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

  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // Actualizar total y conteo cuando cambien los items
  useEffect(() => {
    const updateTotals = async () => {
      const totalAmount = await cartService.getCartTotal();
      const count = await cartService.getCartItemCount();
      setTotal(totalAmount);
      setItemCount(count);
    };
    updateTotals();
  }, [cartItems]);

  return (
    <>
      {/* 🔘 Icono del carrito - se oculta cuando el offcanvas está abierto o cuando el user login está visible */}
      {!mostrar && !userLoginVisible && (
        <Button 
          onClick={handleMostrar} 
          id="cart-button"
          variant="primary"
          className={`cart-button-transition ${buttonVisible ? 'cart-button-visible' : 'cart-button-hidden'}`}
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
          <Offcanvas.Title className='offcanvas-title'>Tu Carrito</Offcanvas.Title>
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
                  <ListGroup.Item key={item.id} className="cart-item">
                    <div className="cart-item-content">
                      <img 
                        src={getProductImage(item.productoImagen)} 
                        alt={item.productoNombre}
                        className="cart-item-image"
                      />
                      <div className="cart-item-details">
                        <h6 className="cart-item-name">{item.productoNombre}</h6>
                        <p className="cart-item-price">${item.precioCLP?.toLocaleString('es-CL')}</p>
                        
                        <div className="cart-item-controls">
                          <button 
                            className="cart-qty-btn"
                            onClick={() => handleDecrement(item.id)}
                            disabled={item.cantidad <= 1}
                          >
                            <Dash />
                          </button>
                          <span className="cart-qty">{item.cantidad}</span>
                          <button 
                            className="cart-qty-btn"
                            onClick={() => handleIncrement(item.id)}
                            disabled={item.cantidad >= item.stockDisponible}
                          >
                            <Plus />
                          </button>
                          <button 
                            className="cart-remove-btn"
                            onClick={() => handleRemove(item.id)}
                          >
                            <Trash />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="cart-item-subtotal">
                      ${(item.precioCLP * item.cantidad).toLocaleString('es-CL')}
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
                  onClick={() => {
                    handleCerrar();
                    navigate('/checkout');
                  }}
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