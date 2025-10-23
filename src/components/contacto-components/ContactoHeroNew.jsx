/* Hero para Contacto basado en el Hero del Home */

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../home-components/Hero/Hero.css';
import heroBg from '../../assets/hero-bg.png';

export default function ContactoHeroNew() {
    return (
        <section className="hero-section">
            <div 
                className="hero-background" 
                style={{ 
                    backgroundImage: `url(${heroBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />
            <div className="hero-overlay">
                <Container fluid className="h-100">
                    <Row className="h-100 align-items-center">
                        <Col xs={11} sm={10} md={9} lg={8} xl={6} className="px-3 px-sm-4 px-lg-5">
                            <div className="hero-content">
                                <h1 className="hero-title mb-3">Contáctanos</h1>
                                <h4 className="hero-subtitle">Estamos aquí para ayudarte</h4>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    );
}