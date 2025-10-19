export default function ValuesSection({ values: valuesFromLoader }) {
    // Valores por defecto si no vienen del loader
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

    // Usar valores del loader si están disponibles, sino usar los por defecto
    const values = valuesFromLoader?.length > 0 ? valuesFromLoader.map(value => ({
        icon: `fas ${value.icon}`,
        title: value.name,
        description: value.description
    })) : defaultValues;

    return (
        <section className="values-section">
            <div className="container">
                <div className="values-header">
                    <h2>Nuestros Valores</h2>
                    <p>Los principios que guían nuestro trabajo</p>
                </div>
                
                <div className="row">
                    {values.map((value, index) => (
                        <div key={index} className="col-lg-3 col-md-6 mb-4">
                            <div className="value-card">
                                <div className="value-icon">
                                    <i className={value.icon}></i>
                                </div>
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}