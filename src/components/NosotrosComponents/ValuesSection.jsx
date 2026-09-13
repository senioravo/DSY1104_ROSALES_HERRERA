export default function ValuesSection({ valoresInfo, valores }) {
    // 🔄 DATOS DINÁMICOS con fallback
    const defaultValoresInfo = {
        titulo: "Nuestros Valores",
        subtitulo: "Los principios que guían nuestro trabajo"
    };
    
    const defaultValues = [
        {
            icon: "fas fa-heart",
            title: "Pasión",
            description: "Ponemos amor en cada receta"
        },
        {
            icon: "fas fa-gem",
            title: "Calidad",
            description: "Ingredientes selectos y procesos cuidadosos"
        },
        {
            icon: "fas fa-users",
            title: "Familia",
            description: "Tradición familiar de generación en generación"
        },
        {
            icon: "fas fa-leaf",
            title: "Frescura",
            description: "Productos frescos elaborados diariamente"
        }
    ];
    
    const info = valoresInfo || defaultValoresInfo;
    const valuesData = valores || defaultValues;

    return (
        <section className="values-section">
            <div className="container">
                <div className="values-header">
                    <h2>{info.titulo}</h2>
                    <p>{info.subtitulo}</p>
                </div>
                
                <div className="row">
                    {valuesData.map((value, index) => (
                        <div key={value.id || index} className="col-lg-3 col-md-6 mb-4">
                            <div className="value-card">
                                <div 
                                    className="value-icon"
                                    style={value.color ? { color: value.color } : {}}
                                >
                                    <i className={value.icon}></i>
                                </div>
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                                {value.destacado && (
                                    <span className="value-badge">⭐ Destacado</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}