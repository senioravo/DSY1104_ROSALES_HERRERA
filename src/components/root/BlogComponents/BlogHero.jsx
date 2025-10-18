import { Link } from 'react-router-dom';

export default function BlogHero() {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <Link to="/" className="back-button">
                    <i className="fas fa-arrow-left"></i> Volver al Inicio
                </Link>
                
                <div className="hero-text">
                    <h1>Nuestro Blog</h1>
                    <p>Recetas, consejos y secretos de pastelería</p>
                    <div className="hero-decoration">
                        <i className="fas fa-book-open"></i>
                    </div>
                </div>
            </div>
            <div className="hero-bg-pattern"></div>
        </section>
    );
}