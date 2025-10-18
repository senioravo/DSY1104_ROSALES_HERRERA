export default function MissionSection() {
    return (
        <section className="mission-section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="mission-content">
                            <h2>Nuestra Misión</h2>
                            <p>Desde 1995, nos dedicamos a crear dulces momentos que perduren en el tiempo. Cada torta, cada pastel, cada sonrisa de satisfacción de nuestros clientes es parte de nuestra historia.</p>
                            <div className="mission-stats">
                                <div className="stat-item">
                                    <span className="stat-number">30+</span>
                                    <span className="stat-label">Años de experiencia</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">10k+</span>
                                    <span className="stat-label">Clientes felices</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">100+</span>
                                    <span className="stat-label">Productos únicos</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mission-image">
                            <img src="/images/nosotros/badge-1995.png" alt="Nuestra pastelería" />
                            <div className="image-decoration"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}