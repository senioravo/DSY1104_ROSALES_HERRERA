import { Link } from 'react-router-dom';

export default function HeroSection({ heroData }) {
    // 🔄 USAR DATOS DINÁMICOS con fallback
    const defaultHero = {
        titulo: "Nuestra Historia",
        subtitulo: "30 años endulzando momentos especiales",
        icono: "fas fa-birthday-cake",
        botonVolver: {
            texto: "Volver al Inicio",
            icono: "fas fa-arrow-left",
            link: "/"
        }
    };
    
    const hero = heroData || defaultHero;
    
    return (
        <section className="hero-section">
            <div className="hero-content">
                <Link to={hero.botonVolver.link} className="back-button">
                    <i className={hero.botonVolver.icono}></i> {hero.botonVolver.texto}
                </Link>
                
                <div className="hero-text">
                    <h1>{hero.titulo}</h1>
                    <p>{hero.subtitulo}</p>
                    {hero.descripcion && (
                        <p className="hero-description">{hero.descripcion}</p>
                    )}
                    <div className="hero-decoration">
                        <i className={hero.icono}></i>
                    </div>
                    
                    {/* 📊 ESTADÍSTICAS DESTACADAS (si existen) */}
                    {hero.estadisticasDestacadas && (
                        <div className="hero-stats">
                            {hero.estadisticasDestacadas.map(stat => (
                                <div key={stat.id} className="hero-stat-item">
                                    <span className="stat-number">{stat.numero}</span>
                                    <span className="stat-text">{stat.texto}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="hero-bg-pattern"></div>
        </section>
    );
}