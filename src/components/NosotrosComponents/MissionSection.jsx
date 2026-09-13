export default function MissionSection({ misionData, estadisticas }) {
    // 🔄 DATOS DINÁMICOS con fallback
    const defaultMision = {
        titulo: "Nuestra Misión",
        descripcion: "Desde 1995, nos dedicamos a crear dulces momentos que perduren en el tiempo. Cada torta, cada pastel, cada sonrisa de satisfacción de nuestros clientes es parte de nuestra historia.",
        imagen: "/images/nosotros/badge-1995.png",
        imagenAlt: "Nuestra pastelería"
    };
    
    const defaultEstadisticas = [
        {
            numero: "30+",
            etiqueta: "Años de experiencia"
        },
        {
            numero: "10k+",
            etiqueta: "Clientes felices"
        },
        {
            numero: "100+",
            etiqueta: "Productos únicos"
        }
    ];
    
    const mision = misionData || defaultMision;
    const stats = estadisticas || defaultEstadisticas;
    
    return (
        <section className="mission-section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="mission-content">
                            <h2>{mision.titulo}</h2>
                            <p>{mision.descripcion}</p>
                            <div className="mission-stats">
                                {stats.map((stat, index) => (
                                    <div key={stat.id || index} className="stat-item">
                                        <span className="stat-number">{stat.numero}</span>
                                        <span className="stat-label">{stat.etiqueta}</span>
                                        {stat.descripcion && (
                                            <small className="stat-description">{stat.descripcion}</small>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mission-image">
                            <img 
                                src={mision.imagen} 
                                alt={mision.imagenAlt || mision.titulo} 
                            />
                            <div className="image-decoration"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}