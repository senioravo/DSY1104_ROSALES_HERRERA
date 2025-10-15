import { useState, useEffect } from 'react';

export default function Nosotros() {
    // Datos del carrusel con imágenes, títulos y año
    const carouselData = [
        {
            id: 1,
            image: "/images/nosotros/carrusel-1995.png",
            title: "Mejor pastelería comunal, Santiago 1995",
            year: "1995",
            description: "Reconocimiento como la mejor pastelería comunal de Santiago"
        },
        {
            id: 2,
            image: "/images/nosotros/carrusel-2005.png",
            title: "Expansión y crecimiento, Santiago 2005", 
            year: "2005",
            description: "Periodo de expansión y crecimiento de la empresa"
        },
        {
            id: 3,
            image: "/images/nosotros/carrusel-2015.png",
            title: "Modernización de la panadería, Santiago 2015",
            year: "2015",
            description: "Modernización de instalaciones y procesos"
        },
        {
            id: 4,
            image: "/images/nosotros/carrusel-2025.png",
            title: "Panadería moderna y tecnológica, Santiago 2025",
            year: "2025",
            description: "Era digital: tecnología e innovación en repostería"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-slide cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselData.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, [carouselData.length]);

    // Funciones para navegar manualmente
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="container-fluid p-0" style={{ backgroundColor: 'var(--lemon)' }}>
            {/* Header Section */}
            <section className="py-5" style={{ backgroundColor: 'var(--v' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1 
                                className="display-4 mb-3" 
                                style={{ 
                                    color: 'var(--chocolate)', 
                                    fontFamily: 'serif',
                                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                                    fontWeight: 'bold'
                                }}
                            >
                                Sobre nosotros
                            </h1>
                            <p 
                                className="lead" 
                                style={{ 
                                    color: 'var(--chocolate-light)',
                                    fontSize: '1.1rem',
                                    fontStyle: 'italic'
                                }}
                            >
                                Nuestra historia y compromiso
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Carrusel Section - PRIMERO */}
            <section className="py-4" style={{ backgroundColor: 'var(--vanilla)' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10">
                            <div 
                                id="historyCarousel" 
                                className="carousel slide" 
                                data-bs-ride="carousel" 
                                data-bs-interval="5000"
                                style={{ maxWidth: '1200px', margin: '0 auto' }}
                            >
                                {/* Indicadores del carrusel */}
                                <div className="carousel-indicators">
                                    {carouselData.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            data-bs-target="#historyCarousel"
                                            data-bs-slide-to={index}
                                            onClick={() => goToSlide(index)}
                                            className={index === currentSlide ? "active" : ""}
                                            aria-current={index === currentSlide ? "true" : "false"}
                                            aria-label={`Slide ${index + 1}`}
                                            style={{
                                                backgroundColor: index === currentSlide ? 'var(--caramel)' : 'var(--caramel-lighter)',
                                                width: '15px',
                                                height: '15px',
                                                borderRadius: '50%',
                                                border: `2px solid var(--caramel-dark)`,
                                                borderColor: 'var(--caramel-dark)',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.3s ease',
                                                outline: 'none',
                                                boxShadow: 'none',
                                                WebkitAppearance: 'none',
                                                MozAppearance: 'none',
                                                appearance: 'none'
                                            }}
                                        ></button>
                                    ))}
                                </div>
                                
                                <div className="carousel-inner rounded-3 shadow-lg">
                                    {carouselData.map((item, index) => (
                                        <div 
                                            key={item.id}
                                            className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
                                            style={{ transition: 'opacity 0.5s ease-in-out' }}
                                        >
                                            <div className="position-relative">
                                                <img 
                                                    src={item.image} 
                                                    className="d-block w-100" 
                                                    alt={item.title}
                                                    style={{ 
                                                        height: 'clamp(350px, 50vh, 500px)', 
                                                        objectFit: 'cover',
                                                        borderRadius: '0.5rem'
                                                    }}
                                                />
                                                {/* Overlay sutil para el año abajo */}
                                                <div 
                                                    className="position-absolute bottom-0 start-0 w-100 d-flex justify-content-center"
                                                    style={{ 
                                                        background: `linear-gradient(to top, 
                                                            rgba(114, 92, 63, 0.9) 0%, 
                                                            rgba(114, 92, 63, 0.7) 50%,
                                                            transparent 100%)`,
                                                        borderRadius: '0 0 0.5rem 0.5rem',
                                                        paddingTop: '60px',
                                                        paddingBottom: '20px'
                                                    }}
                                                >
                                                    {/* Año grande abajo - como en tu imagen */}
                                                    <div className="text-center">
                                                        <span 
                                                            style={{ 
                                                                fontSize: 'clamp(3rem, 6vw, 4.5rem)', 
                                                                fontWeight: 'bold',
                                                                color: 'var(--caramel-light)',
                                                                textShadow: '3px 3px 6px rgba(0,0,0,0.8)',
                                                                fontFamily: 'serif',
                                                                letterSpacing: '3px'
                                                            }}
                                                        >
                                                            {item.year}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Controles del carrusel */}
                                <button 
                                    className="carousel-control-prev" 
                                    type="button" 
                                    onClick={prevSlide}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        left: '10px'
                                    }}
                                >
                                    <span 
                                        aria-hidden="true"
                                        style={{ 
                                            display: 'inline-block',
                                            width: '50px',
                                            height: '50px',
                                            backgroundColor: 'var(--chocolate)',
                                            borderRadius: '50%',
                                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z'/%3e%3c/svg%3e")`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                            backgroundSize: '20px 20px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                    ></span>
                                    <span className="visually-hidden">Anterior</span>
                                </button>
                                <button 
                                    className="carousel-control-next" 
                                    type="button" 
                                    onClick={nextSlide}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        right: '10px'
                                    }}
                                >
                                    <span 
                                        aria-hidden="true"
                                        style={{ 
                                            display: 'inline-block',
                                            width: '50px',
                                            height: '50px',
                                            backgroundColor: 'var(--chocolate)',
                                            borderRadius: '50%',
                                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z'/%3e%3c/svg%3e")`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                            backgroundSize: '20px 20px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                    ></span>
                                    <span className="visually-hidden">Siguiente</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Información Section - SEGUNDO */}
            <section className="py-5" style={{ backgroundColor: 'var(--lemon-light)' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h2 
                                className="text-center mb-5" 
                                style={{ 
                                    color: 'var(--chocolate)', 
                                    fontFamily: 'serif',
                                    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                                    fontWeight: 'bold'
                                }}
                            >
                                Mejor pastelería comunal, Santiago 1995
                            </h2>
                            
                            <div className="row">
                                <div className="col-md-8">
                                    <div 
                                        className="mb-4" 
                                        style={{ 
                                            lineHeight: '1.8', 
                                            color: 'var(--chocolate-dark)',
                                            fontSize: '1.1rem',
                                            textAlign: 'left'
                                        }}
                                    >
                                        <p>
                                            En 1995, Mil Sabores inició su bella historia el día que comenzó como la mejor pastelería 
                                            comunal de Santiago por la prestigiosa revista de vida internacional Dessert&Delicious. Este 
                                            reconocimiento fue el resultado de una exhaustiva encuesta que evaluó más de 100 
                                            pastelerías locales, considerando la calidad de los productos, el servicio al cliente y la 
                                            experiencia de compra.
                                        </p>
                                        
                                        <p>
                                            La encuesta, que se realizó durante seis meses, involucró a más de 5,000 habitantes de la 
                                            comuna y expertos en repostería. Mil Sabores destacó especialmente por sus tradicionales 
                                            tortas tres leches y sus innovadoras líneas de pasteles y helados, que en ese entonces era una 
                                            propuesta revolucionaria.
                                        </p>
                                        
                                        <p>
                                            Este reconocimiento nos llenó de orgullo, sino que también marcó el comienzo de 
                                            una nueva era para nuestra pastelería, estableciendo un estándar de excelencia que 
                                            mantenemos hasta hoy.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="col-md-4">
                                    <div className="text-center">
                                        <img 
                                            src="/images/nosotros/badge-1995.png"
                                            alt="Reconocimiento 1995"
                                            className="img-fluid rounded-3 shadow mx-auto"
                                            style={{ 
                                                maxHeight: '350px',
                                                maxWidth: '280px',
                                                border: `3px solid var(--caramel-dark)`
                                            }}
                                        />
                                        <p 
                                            className="mt-3" 
                                            style={{ 
                                                color: 'var(--chocolate-light)',
                                                fontSize: '0.9rem',
                                                fontStyle: 'italic'
                                            }}
                                        >
                                            Certificado "Mejor Pastelería Comunal" 1995
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}