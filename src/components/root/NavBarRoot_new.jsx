import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CarritoLateral from './cart/Cart.jsx';

export default function NavBarRoot() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        console.log('Montando NavBarRoot');
        const lastScroll = { value: 0 };

        const handleScroll = (e) => {
            const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            
            console.log('SCROLL DETECTADO! Posicion:', currentScrollY);

            if (currentScrollY <= 100) {
                console.log('Top - visible');
                setIsVisible(true);
            } else {
                const scrollDiff = currentScrollY - lastScroll.value;
                
                if (scrollDiff > 10) {
                    console.log('DOWN - ocultar', scrollDiff);
                    setIsVisible(false);
                } else if (scrollDiff < -10) {
                    console.log('UP - mostrar', scrollDiff);
                    setIsVisible(true);
                }
            }

            lastScroll.value = currentScrollY;
        };

        // Múltiples listeners con capture
        window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
        document.addEventListener('scroll', handleScroll, { capture: true, passive: true });
        
        // Llamar al montar
        handleScroll();

        return () => {
            console.log('Desmontando NavBarRoot');
            window.removeEventListener('scroll', handleScroll, true);
            document.removeEventListener('scroll', handleScroll, true);
        };
    }, []);

    console.log('isVisible:', isVisible);

    return (
        <Navbar 
            expand="lg" 
            className={isVisible ? 'navbar-visible' : 'navbar-hidden'}
            id="navBarRoot" 
            data-bs-theme="light"
            data-visible={isVisible ? 'true' : 'false'}
            style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(-120%)',
                opacity: isVisible ? 1 : 0,
                transition: 'transform 0.3s ease, opacity 0.3s ease'
            }}
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
