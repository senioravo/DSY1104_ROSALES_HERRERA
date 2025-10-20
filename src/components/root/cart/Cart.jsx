import React, { useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { Cart3 } from 'react-bootstrap-icons'; // ícono de carrito
import './Cart.css';

export default function CarritoLateral() {
  const [mostrar, setMostrar] = useState(false);

  const handleCerrar = () => setMostrar(false);
  const handleMostrar = () => setMostrar(true);

  return (
    <>
      {/* 🔘 Icono del carrito */}
      <Button 
        onClick={handleMostrar} 
        className="position-fixed end-0 m-3 m"
        id="cart-button"
      >
        <Cart3 size={20}/>
      </Button>

      {/* 🛒 Ventana lateral del carrito */}
      <Offcanvas show={mostrar} onHide={handleCerrar} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tu carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>No hay productos en el carrito.</p>
          <Button variant="success">Finalizar compra</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}