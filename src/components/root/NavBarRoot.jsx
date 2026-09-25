import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CarritoLateral from './cart/Cart.jsx';
import UserLogin from './user/UserLogin.jsx';

// No dependen de la visibilidad del navbar: memo evita re-renderizarlos en cada toggle
const Carrito = memo(CarritoLateral);
const Usuario = memo(UserLogin);

// Posiciones del sidebar de productos y del botón del carrito según el navbar
const OFFSETS_VISIBLE = { sidebarTop: '110px', cartTop: '90px' };
const OFFSETS_HIDDEN = { sidebarTop: '20px', cartTop: '20px' };

// Desplazamiento mínimo (px) entre frames para mostrar/ocultar el navbar
const SCROLL_DELTA = 3;
// Zona superior en la que el navbar siempre se muestra
const TOP_ZONE = 10;
// Margen mínimo entre el sidebar y el footer
const FOOTER_MARGIN = 20;

// El contenedor que hace scroll es <body> (html y body tienen overflow: auto),
// por eso window.scrollY es 0 y el evento no llega a window por bubbling
const getScrollY = () =>
    window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

const isPageScroll = (target) =>
    target === document || target === document.documentElement || target === document.body;

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
        let lastY = getScrollY();
        let visible = true;
        let frame = 0;
        let lastMenu = null;
        let lastFooterDistance = null;

        const update = () => {
            frame = 0;
            const y = getScrollY();

            // El sidebar solo existe en /productos; sin él no se mide el footer
            const menu = document.querySelector('.products-menu');
            if (menu) {
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
                // Se escribe en el propio sidebar y no en :root, para no recalcular
                // los estilos de toda la página en cada frame
                if (menu !== lastMenu || footerDistance !== lastFooterDistance) {
                    lastMenu = menu;
                    lastFooterDistance = footerDistance;
                    menu.style.setProperty('--sidebar-bottom', `${footerDistance}px`);
                }
            }

            let next = visible;
            if (y <= TOP_ZONE) {
                next = true;
            } else if (y - lastY > SCROLL_DELTA) {
                next = false;
            } else if (lastY - y > SCROLL_DELTA) {
                next = true;
            }
            lastY = y;

            if (next !== visible) {
                visible = next;
                setIsVisible(next);
            }
        };

        // Agrupa los eventos de scroll en un único update por frame
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        // Captura en document para recibir el scroll de <body>; se ignoran
        // los scrolls internos (sidebar, carrito, etc.)
        const handleScroll = (e) => {
            if (isPageScroll(e.target)) schedule();
        };

        document.addEventListener('scroll', handleScroll, { capture: true, passive: true });
        window.addEventListener('resize', schedule, { passive: true });
        update();

        return () => {
            document.removeEventListener('scroll', handleScroll, { capture: true });
            window.removeEventListener('resize', schedule);
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
                    <Usuario />
                </Container>
            </Navbar>

            {/* Botón del carrito fuera del navbar para que siempre sea visible */}
            <Carrito />
        </>
    );
}
