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

    // Efecto para actualizar variables CSS cuando cambia la visibilidad del navbar o proximidad al footer
    useEffect(() => {
        const root = document.documentElement;
        
        // Calcular altura y posición del sidebar basado en navbar y footer
        let sidebarTop, sidebarMaxHeight, cartButtonTop;
        
        if (isVisible) {
            // Navbar visible - sidebar comienza debajo del navbar
            sidebarTop = '110px';
            cartButtonTop = '90px';
            if (isNearFooter) {
                // Cerca del footer: reducir altura para no taparlo
                sidebarMaxHeight = 'calc(100vh - 130px - var(--footer-overlap, 0px))';
            } else {
                // Altura normal: desde 110px hasta el final - 20px margen
                sidebarMaxHeight = 'calc(100vh - 130px)';
            }
        } else {
            // Navbar oculto - sidebar se expande hacia arriba ocupando el espacio del navbar
            sidebarTop = '20px'; // Se mueve hacia arriba (de 110px a 20px)
            cartButtonTop = '20px';
            if (isNearFooter) {
                // Cerca del footer: altura expandida menos overlap
                // Desde 20px hasta el final con margen
                sidebarMaxHeight = 'calc(100vh - 40px - var(--footer-overlap, 0px))';
            } else {
                // Navbar oculto: ocupa desde 20px hasta el final
                // Gana los 90px del navbar (110px - 20px = 90px hacia arriba)
                sidebarMaxHeight = 'calc(100vh - 40px)';
            }
        }
        
        root.style.setProperty('--sidebar-top', sidebarTop);
        root.style.setProperty('--sidebar-max-height', sidebarMaxHeight);
        root.style.setProperty('--cart-button-top', cartButtonTop);
    }, [isVisible, isNearFooter]);

    useEffect(() => {
        const lastScroll = { value: 0 };

        const handleScroll = () => {
            const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            
            // Detectar proximidad al footer
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const scrollBottom = currentScrollY + windowHeight;
            
            // Altura del footer + margen deseado
            const footerMargin = 20; // Margen entre sidebar y footer
            const footerElement = document.getElementById('footerRoot');
            const footerHeight = footerElement ? footerElement.offsetHeight : 100;
            const totalFooterSpace = footerHeight + footerMargin;
            
            const distanceToBottom = documentHeight - scrollBottom;
            
            // Solo activar isNearFooter cuando REALMENTE estamos cerca del footer
            // Esto evita cambios constantes de altura durante el scroll normal
            if (distanceToBottom <= 50) {
                // Muy cerca del footer - calcular overlap exacto
                const overlap = Math.max(0, totalFooterSpace - distanceToBottom);
                document.documentElement.style.setProperty('--footer-overlap', `${overlap}px`);
                setIsNearFooter(true);
            } else {
                // Lejos del footer - altura normal
                document.documentElement.style.setProperty('--footer-overlap', '0px');
                setIsNearFooter(false);
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