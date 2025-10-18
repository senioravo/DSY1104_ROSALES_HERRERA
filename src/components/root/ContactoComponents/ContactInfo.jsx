export default function ContactInfo() {
    const contactData = [
        {
            icon: "fas fa-map-marker-alt",
            title: "Dirección",
            info: "Av. Principal 1234, Santiago, Chile",
            color: "var(--accent-choco)"
        },
        {
            icon: "fas fa-phone",
            title: "Teléfono",
            info: "+56 2 2345 6789",
            color: "var(--accent-pink)"
        },
        {
            icon: "fas fa-envelope",
            title: "Email",
            info: "contacto@pasteleria.cl",
            color: "var(--accent-choco)"
        },
        {
            icon: "fas fa-clock",
            title: "Horarios",
            info: "Lun - Sáb: 9:00 - 20:00",
            color: "var(--accent-pink)"
        }
    ];

    return (
        <section className="contact-info-section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="contact-info-header">
                            <h2>Información de Contacto</h2>
                            <p>También puedes visitarnos o llamarnos directamente</p>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    {contactData.map((item, index) => (
                        <div key={index} className="col-lg-3 col-md-6 mb-4">
                            <div className="contact-info-card">
                                <div className="contact-icon" style={{ backgroundColor: item.color }}>
                                    <i className={item.icon}></i>
                                </div>
                                <div className="contact-details">
                                    <h3>{item.title}</h3>
                                    <p>{item.info}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row mt-5">
                    <div className="col-12">
                        <div className="map-container">
                            <div className="map-placeholder">
                                <i className="fas fa-map"></i>
                                <h3>Ubicación</h3>
                                <p>Aquí puedes integrar Google Maps o cualquier otro mapa</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}