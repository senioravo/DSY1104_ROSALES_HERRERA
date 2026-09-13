import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CarritoLateral from './cart/Cart.jsx';
import UserLogin from './user/UserLogin.jsx';

export default function NavBarRoot() {
    const [isVisible, setIsVisible] = useState(true);
    const [isNearFooter, setIsNearFooter] = useState(false);

    // Inicializar variables CSS al montar el componente
    useEffect(() => {
        const root = document.documentElement;
        // Valores iniciales cuando el navbar es visible
        root.style.setProperty('--sidebar-top', '110px');
        root.style.setProperty('--sidebar-bottom', '20px');
        root.style.setProperty('--cart-button-top', '90px');
    }, []);

    // Efecto para actualizar variables CSS cuando cambia la visibilidad del navbar o proximidad al footer
    useEffect(() => {
        const root = document.documentElement;
        
        // Calcular posición del sidebar y carrito basado en visibilidad del navbar
        let sidebarTop, sidebarBottom, cartButtonTop;
        
        if (isVisible) {
            // Navbar visible - sidebar comienza debajo del navbar
            sidebarTop = '110px';
            cartButtonTop = '90px';
        } else {
            // Navbar oculto - sidebar se expande hacia arriba
            sidebarTop = '20px';
            cartButtonTop = '20px';
        }

        // Controlar el borde inferior según proximidad al footer
        if (isNearFooter) {
            // Cerca del footer - aumentar margen inferior para no taparlo
            sidebarBottom = 'var(--footer-distance, 20px)';
        } else {
            // Lejos del footer - margen normal
            sidebarBottom = '20px';
        }
        
        root.style.setProperty('--sidebar-top', sidebarTop);
        root.style.setProperty('--sidebar-bottom', sidebarBottom);
        root.style.setProperty('--cart-button-top', cartButtonTop);
    }, [isVisible, isNearFooter]);

    useEffect(() => {
        const lastScroll = { value: 0 };

        const handleScroll = () => {
            const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            
            // Detectar proximidad al footer
            const footerElement = document.getElementById('footerRoot');
            
            if (footerElement) {
                const footerRect = footerElement.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // Posición del top del footer respecto a la ventana
                const footerTop = footerRect.top;
                
                // Margen mínimo que queremos mantener entre el sidebar y el footer
                const minMargin = 20;
                
                // Si el footer está entrando en la pantalla
                if (footerTop < windowHeight) {
                    setIsNearFooter(true);
                    // El bottom del sidebar debe ser: windowHeight - footerTop + minMargin
                    // Esto hace que el sidebar se detenga justo antes del footer
                    const footerDistance = windowHeight - footerTop + minMargin;
                    document.documentElement.style.setProperty('--footer-distance', `${footerDistance}px`);
                } else {
                    // Footer fuera de la pantalla - margen normal
                    setIsNearFooter(false);
                    document.documentElement.style.setProperty('--footer-distance', '20px');
                }
            }

            // Lógica del navbar (scroll up/down)
            if (currentScrollY <= 10) {
                setIsVisible(true);
            } else {
                const scrollDiff = currentScrollY - lastScroll.value;
                
                if (scrollDiff > 3) {
                    setIsVisible(false);
                } else if (scrollDiff < -3) {
                    setIsVisible(true);
                }
            }

            lastScroll.value = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
        document.addEventListener('scroll', handleScroll, { capture: true, passive: true });
        
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll, true);
            document.removeEventListener('scroll', handleScroll, true);
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
                            <Link to="/" className="custom-nav-link">Home</Link>
                            <Link to="/nosotros" className="custom-nav-link">Nosotros</Link>
                            <Link to="/productos" className="custom-nav-link">Productos</Link>
                            <Link to="/personaliza-tu-torta" className="custom-nav-link">Personaliza tu torta</Link>
                            <Link to="/blog" className="custom-nav-link">Blog</Link>
                            <Link to="/contacto" className="custom-nav-link">Contacto</Link>
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