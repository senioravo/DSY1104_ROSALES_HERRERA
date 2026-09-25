import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CarritoLateral from './cart/Cart.jsx';
import UserLogin from './user/UserLogin.jsx';

// Posiciones del sidebar de productos y del botón del carrito según el navbar
const OFFSETS_VISIBLE = { sidebarTop: '110px', cartTop: '90px' };
const OFFSETS_HIDDEN = { sidebarTop: '20px', cartTop: '20px' };

// Desplazamiento mínimo (px) antes de cambiar la visibilidad; evita parpadeos
const SCROLL_DELTA = 8;
// Zona superior en la que el navbar siempre se muestra
const TOP_ZONE = 10;
// Margen mínimo entre el sidebar y el footer
const FOOTER_MARGIN = 20;

export default function NavBarRoot() {
    const [isVisible, setIsVisible] = useState(true);

    // Solo se ejecuta al alternar la visibilidad, no en cada scroll
    useEffect(() => {
        const rootStyle = document.documentElement.style;
        const offsets = isVisible ? OFFSETS_VISIBLE : OFFSETS_HIDDEN;
        rootStyle.setProperty('--sidebar-top', offsets.sidebarTop);
        rootStyle.setProperty('--cart-button-top', offsets.cartTop);
    }, [isVisible]);

    useEffect(() => {
        const rootStyle = document.documentElement.style;
        let lastY = window.scrollY;
        let visible = true;
        let lastFooterDistance = null;
        let frame = 0;

        const update = () => {
            frame = 0;
            const y = window.scrollY;

            // 1) Lecturas de layout (una sola por frame)
            let footerDistance = FOOTER_MARGIN;
            const footer = document.getElementById('footerRoot');
            if (footer) {
                const footerTop = footer.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                // Si el footer entra en pantalla, el sidebar se detiene antes de taparlo
                if (footerTop < windowHeight) {
                    footerDistance = Math.round(windowHeight - footerTop + FOOTER_MARGIN);
                }
            }

            // 2) Escrituras, solo si el valor cambió
            if (footerDistance !== lastFooterDistance) {
                lastFooterDistance = footerDistance;
                rootStyle.setProperty('--sidebar-bottom', `${footerDistance}px`);
            }

            let next = visible;
            if (y <= TOP_ZONE) {
                next = true;
                lastY = y;
            } else if (Math.abs(y - lastY) > SCROLL_DELTA) {
                next = y < lastY;
                lastY = y;
            }

            if (next !== visible) {
                visible = next;
                setIsVisible(next);
            }
        };

        // Agrupa los eventos de scroll en un único update por frame
        const handleScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        update();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <>
            <Navbar
                expand="lg"
                className={isVisible ? 'navbar-visible' : 'navbar-hidden'}
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
                            <NavLink to="/" end className="custom-nav-link">Home</NavLink>
                            <NavLink to="/nosotros" className="custom-nav-link">Nosotros</NavLink>
                            <NavLink to="/productos" className="custom-nav-link">Productos</NavLink>
                            <NavLink to="/personaliza-tu-torta" className="custom-nav-link">Personaliza tu torta</NavLink>
                            <NavLink to="/blog" className="custom-nav-link">Blog</NavLink>
                            <NavLink to="/contacto" className="custom-nav-link">Contacto</NavLink>
                        </Nav>
                    </Navbar.Collapse>

                    {/* Columna Derecha - Botón de usuario */}
                    <UserLogin />
                </Container>
            </Navbar>

            {/* Botón del carrito fuera del navbar para que siempre sea visible */}
            <CarritoLateral />
        </>
    );
}
