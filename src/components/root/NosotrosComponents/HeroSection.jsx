import { Link } from 'react-router-dom';

export default function HeroSection() {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <Link to="/" className="back-button">
                    <i className="fas fa-arrow-left"></i> Volver al Inicio
                </Link>
                
                <div className="hero-text">
                    <h1>Nuestra Historia</h1>
                    <p>30 años endulzando momentos especiales</p>
                    <div className="hero-decoration">
                        <i className="fas fa-birthday-cake"></i>
                    </div>
                </div>
            </div>
            <div className="hero-bg-pattern"></div>
        </section>
    );
}