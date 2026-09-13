import { Link } from 'react-router-dom';

export default function ContactoHero() {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <Link to="/" className="back-button">
                    <i className="fas fa-arrow-left"></i> Volver al Inicio
                </Link>
                
                <div className="hero-text">
                    <h1>Contáctanos</h1>
                    <p>Estamos aquí para ayudarte</p>
                    <div className="hero-decoration">
                        <i className="fas fa-envelope"></i>
                    </div>
                </div>
            </div>
            <div className="hero-bg-pattern"></div>
        </section>
    );
}