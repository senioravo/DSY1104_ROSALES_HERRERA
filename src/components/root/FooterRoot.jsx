import { Container, Row, Col } from 'react-bootstrap';
import { Instagram, Facebook, Whatsapp, GeoAlt, Telephone, Envelope } from 'react-bootstrap-icons';
import { useEffect } from 'react';
import './FooterRoot.css';

export default function FooterRoot() {
    // Efecto para detectar si viene del footer y hacer scroll animado
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('fromFooter') === 'true') {
            // Remover el parámetro de la URL sin recargar
            const newUrl = window.location.pathname + window.location.search.replace(/[?&]fromFooter=true/, '').replace(/^&/, '?');
            window.history.replaceState({}, '', newUrl);
            
            // Primero, hacer scroll al fondo INMEDIATAMENTE (antes de que el usuario vea)
            const maxScroll = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
            
            window.scrollTo(0, maxScroll);
            
            // Pequeño delay para asegurar que el scroll al fondo se complete
            setTimeout(() => {
                // Ahora animar desde el fondo hacia arriba
                const duration = 1000;
                const start = window.scrollY;
                const startTime = performance.now();
                
                const animateScroll = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function suave
                    const easeInOutCubic = progress < 0.5
                        ? 4 * progress * progress * progress
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                    
                    window.scrollTo(0, start * (1 - easeInOutCubic));
                    
                    if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                    } else {
                        window.scrollTo(0, 0);
                    }
                };
                
                requestAnimationFrame(animateScroll);
            }, 10);
        }
    }, []);

    // Manejador de clic que recarga la página con parámetro fromFooter
    const handleLinkClick = (e, path) => {
        e.preventDefault();
        
        // Agregar parámetro fromFooter a la URL
        const separator = path.includes('?') ? '&' : '?';
        const newPath = path + separator + 'fromFooter=true';
        
        // Navegar con recarga completa
        window.location.href = newPath;
    };

    return (
        <footer className="FooterRoot" id="footerRoot">
            <Container fluid className="footer-container">
                <Row className="footer-main">
                    {/* Sección Sobre Nosotros */}
                    <Col lg={3} md={6} className="footer-column">
                        <h5 className="footer-title">Pastelería Mil Sabores</h5>
                        <p className="footer-description">
                            Endulzando vidas desde 2010. Productos artesanales con los mejores ingredientes y el amor de siempre.
                        </p>
                        <div className="footer-social">
                            <a href="https://instagram.com/milsabores" target="_blank" rel="noopener noreferrer" className="social-link">
                                <Instagram size={24} />
                            </a>
                            <a href="https://facebook.com/milsabores" target="_blank" rel="noopener noreferrer" className="social-link">
                                <Facebook size={24} />
                            </a>
                            <a href="https://web.whatsapp.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <Whatsapp size={24} />
                            </a>
                        </div>
                    </Col>

                    {/* Sección Enlaces Rápidos */}
                    <Col lg={2} md={6} className="footer-column">
                        <h5 className="footer-title">Enlaces Rápidos</h5>
                        <ul className="footer-links">
                            <li><a onClick={(e) => handleLinkClick(e, '/')}>Inicio</a></li>
                            <li><a onClick={(e) => handleLinkClick(e, '/nosotros')}>Nosotros</a></li>
                            <li><a onClick={(e) => handleLinkClick(e, '/productos')}>Productos</a></li>
                            <li><a onClick={(e) => handleLinkClick(e, '/blog')}>Blog</a></li>
                            <li><a onClick={(e) => handleLinkClick(e, '/contacto')}>Contacto</a></li>
                        </ul>
                    </Col>

                    {/* Sección Servicios */}
                    <Col lg={2} md={6} className="footer-column">
                        <h5 className="footer-title">Servicios</h5>
                        <ul className="footer-links">
                            <li><a onClick={(e) => handleLinkClick(e, '/personaliza-tu-torta')}>Personaliza tu Torta</a></li>
                            <li><a onClick={(e) => handleLinkClick(e, '/productos?categoria=TC')}>Tortas Cuadradas</a></li>
                            <li><a onClick={(e) => handleLinkClick(e, '/productos?categoria=TT')}>Tortas Circulares</a></li>
                            <li><a onClick={(e) => handleLinkClick(e, '/productos?categoria=PI')}>Postres Individuales</a></li>
                            <li><a onClick={(e) => handleLinkClick(e, '/productos?categoria=TE')}>Tortas Especiales</a></li>
                        </ul>
                    </Col>

                    {/* Sección Información */}
                    <Col lg={2} md={6} className="footer-column">
                        <h5 className="footer-title">Información</h5>
                        <ul className="footer-links">
                            <li><a onClick={(e) => handleLinkClick(e, '/register')}>Crear Cuenta</a></li>
                            <li><a onClick={(e) => handleLinkClick(e, '/checkout')}>Mi Carrito</a></li>
                            <li><a onClick={(e) => handleLinkClick(e, '/mensajes-contacto')}>Mis Mensajes</a></li>
                            <li><a href="#politicas">Política de Privacidad</a></li>
                            <li><a href="#terminos">Términos y Condiciones</a></li>
                        </ul>
                    </Col>

                    {/* Sección Contacto */}
                    <Col lg={3} md={6} className="footer-column">
                        <h5 className="footer-title">Contáctanos</h5>
                        <ul className="footer-contact">
                            <li>
                                <GeoAlt size={18} />
                                <span>Av. Principal 1234, Santiago, Chile</span>
                            </li>
                            <li>
                                <Telephone size={18} />
                                <span>+56 9 1234 5678</span>
                            </li>
                            <li>
                                <Envelope size={18} />
                                <span>contacto@milsabores.cl</span>
                            </li>
                        </ul>
                        <div className="footer-hours">
                            <p className="hours-title">Horario de Atención:</p>
                            <p>Lun - Vie: 9:00 - 19:00</p>
                            <p>Sáb - Dom: 10:00 - 18:00</p>
                        </div>
                    </Col>
                </Row>

                {/* Sección Copyright */}
                <Row className="footer-bottom">
                    <Col>
                        <div className="footer-copyright">
                            <p>&copy; 2025 Pastelería Mil Sabores. Todos los derechos reservados.</p>
                            <p className="footer-credits">Desarrollado con ❤️ para endulzar tu día</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}