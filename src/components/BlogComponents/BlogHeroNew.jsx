/* Hero para Blog basado en el Hero del Home */

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../home-components/Hero/Hero.css';
import BlogHeroBg from '../../assets/blogHeroBg4.png';

export default function BlogHeroNew() {
    return (
        <section className="hero-section">
            <div 
                className="hero-background" 
                style={{ 
                    backgroundImage: `url(${BlogHeroBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    boxShadow: 'inset 0 0 15px rgba(60, 69, 0, 0.3)'
                }}
            />
            <div className="hero-overlay">
                <Container fluid className="h-100">
                    <Row className="h-100 align-items-center">
                        <Col xs={11} sm={10} md={9} lg={8} xl={6} className="px-3 px-sm-4 px-lg-5">
                            <div className="hero-content">
                                <h1 className="hero-title mb-3">Nuestro Blog</h1>
                                <h4 className="hero-subtitle">Recetas, consejos y secretos de pastelería</h4>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    );
}