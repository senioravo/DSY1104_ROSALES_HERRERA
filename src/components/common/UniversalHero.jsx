import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './UniversalHero.css';
import heroBg from '../../assets/hero-bg.png';

export default function UniversalHero({ 
    title = "Mil Sabores", 
    subtitle = "El dulce sabor de la tradición",
    buttonText = "Descubre nuestros sabores",
    buttonLink = "#productos",
    showButton = true 
}) {
    return (
        <section className="universal-hero-section">
            <div 
                className="universal-hero-background" 
                style={{ 
                    backgroundImage: `url(${heroBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />
            <div className="universal-hero-overlay">
                <Container fluid className="h-100">
                    <Row className="h-100 align-items-center justify-content-center">
                        <Col xs={11} sm={10} md={9} lg={8} xl={6} className="text-center">
                            <div className="universal-hero-content">
                                <h1 className="universal-hero-title mb-3">{title}</h1>
                                <h4 className="universal-hero-subtitle mb-4">{subtitle}</h4>
                                {showButton && (
                                    <Button 
                                        variant="outline-light" 
                                        size="lg" 
                                        className="universal-hero-cta"
                                        href={buttonLink}
                                    >
                                        {buttonText}
                                    </Button>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    );
}