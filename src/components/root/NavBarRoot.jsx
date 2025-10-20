import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CarritoLateral from './cart/Cart.jsx';

export default function NavBarRoot() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Si el scroll es mayor a 100px
            if (currentScrollY > 100) {
                // Si está haciendo scroll hacia abajo, ocultar navbar
                if (currentScrollY > lastScrollY) {
                    setIsVisible(false);
                } 
                // Si está haciendo scroll hacia arriba, mostrar navbar
                else {
                    setIsVisible(true);
                }
            } else {
                // Si está por encima de 1000px, siempre mostrar
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <Navbar 
            expand="lg" 
            className={`navbar ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}
            id="navBarRoot" 
            data-bs-theme="light"
        >
            <Container>
                {/* Columna Izquierda - Brand */}
                <Navbar.Brand as={Link} to="/" className="mx-auto">Mil Sabores</Navbar.Brand>
                
                {/* Toggler para móviles */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                {/* Columna Centro - Navegación */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Link to="/" className="custom-nav-link">Home</Link>
                        <Link to="/nosotros" className="custom-nav-link">Nosotros</Link>
                        <Link to="/productos" className="custom-nav-link">Productos</Link>
                        <Link to="/personaliza-tu-torta" className="custom-nav-link">Personaliza tu torta</Link>
                        <Link to="/blog" className="custom-nav-link">Blog</Link>
                        <Link to="/contacto" className="custom-nav-link">Contacto</Link>
                    </Nav>
                    
                    {/* Columna Derecha - Reservada para función futura */}
                    <Nav className="ms-auto">
                        <CarritoLateral />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}