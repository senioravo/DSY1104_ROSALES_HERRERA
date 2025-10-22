export default function ContactInfo({ contactData, sucursales }) {
    // 🔄 USAR DATOS DINÁMICOS recibidos como props
    // Si no se pasan props, usar datos por defecto (fallback)
    const defaultContactData = [
        {
            icon: "fas fa-map-marker-alt",
            title: "Dirección",
            info: "Av. Principal 1234, Santiago, Chile",
            color: "var(--strawberry)"
        },
        {
            icon: "fas fa-phone",
            title: "Teléfono",
            info: "+56 2 2345 6789",
            color: "var(--strawberry-light)"
        },
        {
            icon: "fas fa-envelope",
            title: "Email",
            info: "contacto@pasteleria.cl",
            color: "var(--strawberry)"
        },
        {
            icon: "fas fa-clock",
            title: "Horarios",
            info: "Lun - Sáb: 9:00 - 20:00",
            color: "var(--strawberry-light)"
        }
    ];

    // Usar datos dinámicos o fallback
    const finalContactData = contactData || defaultContactData;

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
                    {finalContactData.map((item, index) => (
                        <div key={item.id || index} className="col-lg-3 col-md-6 mb-4">
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

                {/* Sección de Sucursales */}
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="contact-info-header">
                            <h2>Nuestras Sucursales</h2>
                            <p>Visítanos en cualquiera de nuestras 3 ubicaciones</p>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    {/* 🔄 RENDERIZAR SUCURSALES DINÁMICAS */}
                    {sucursales && sucursales.length > 0 ? (
                        sucursales.map((sucursal) => (
                            <div key={sucursal.id} className="col-lg-4 col-md-6 mb-4">
                                <div className="sucursal-card">
                                    <div className="sucursal-header">
                                        <i className="fas fa-store"></i>
                                        <h3>{sucursal.nombre}</h3>
                                        {sucursal.destacada && (
                                            <span className="badge bg-warning ms-2">⭐ Principal</span>
                                        )}
                                    </div>
                                    <div className="sucursal-body">
                                        <p><i className="fas fa-map-marker-alt"></i> {sucursal.direccion}</p>
                                        <p><i className="fas fa-phone"></i> {sucursal.telefono}</p>
                                        <p><i className="fas fa-clock"></i> {sucursal.horarios.semana}</p>
                                        <p><i className="fas fa-clock"></i> {sucursal.horarios.domingo}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        // 📋 FALLBACK - Si no hay sucursales dinámicas, mostrar las estáticas
                        <>
                            {/* Sucursal 1 - Santiago Centro */}
                            <div className="col-lg-4 col-md-6 mb-4">
                                <div className="sucursal-card">
                                    <div className="sucursal-header">
                                        <i className="fas fa-store"></i>
                                        <h3>Sucursal Centro</h3>
                                    </div>
                                    <div className="sucursal-body">
                                        <p><i className="fas fa-map-marker-alt"></i> Av. Principal 1234, Santiago Centro</p>
                                        <p><i className="fas fa-phone"></i> +56 2 2345 6789</p>
                                        <p><i className="fas fa-clock"></i> Lun - Sáb: 9:00 - 20:00</p>
                                        <p><i className="fas fa-clock"></i> Dom: 10:00 - 18:00</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}