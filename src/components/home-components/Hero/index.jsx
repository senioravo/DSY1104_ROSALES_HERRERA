/* Hero con react bootstrap */

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Hero.css';
import heroBg from '../../../assets/hero-bg.png';

export default function Hero() {
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
                                <h1 className="hero-title mb-3">Mil Sabores</h1>
                                <h4 className="hero-subtitle mb-4">El dulce sabor de la tradición</h4>
                                <Button 
                                    variant="outline-light" 
                                    size="lg" 
                                    className="hero-cta"
                                    href="#productos"
                                >
                                    Descubre nuestros sabores
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    );
}