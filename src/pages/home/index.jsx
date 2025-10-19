import { useHomeData } from '../../hooks/useLoaderData';

export default function Home() {
    const { hero, stats, featuredProducts } = useHomeData();
    
    return (
        <div>
            {/* Hero Section */}
            <div className="hero-section bg-primary text-white py-5 mb-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="display-4 fw-bold">{hero.title || "Mil Sabores"}</h1>
                            <p className="lead">{hero.subtitle || "La pastelería que endulza tus momentos especiales"}</p>
                            <p className="mb-4">{hero.description || "Más de 30 años creando los postres más deliciosos"}</p>
                            <button className="btn btn-light btn-lg">Ver Productos</button>
                        </div>
                        <div className="col-lg-6">
                            <div className="text-center">
                                <i className="fas fa-birthday-cake fa-6x opacity-75"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            {stats && (
                <div className="stats-section py-5 bg-light">
                    <div className="container">
                        <div className="row text-center">
                            <div className="col-md-3 mb-4">
                                <div className="stat-item">
                                    <h3 className="display-6 text-primary fw-bold">{stats.yearsInBusiness}+</h3>
                                    <p className="text-muted">Años de experiencia</p>
                                </div>
                            </div>
                            <div className="col-md-3 mb-4">
                                <div className="stat-item">
                                    <h3 className="display-6 text-primary fw-bold">{stats.happyCustomers?.toLocaleString()}+</h3>
                                    <p className="text-muted">Clientes felices</p>
                                </div>
                            </div>
                            <div className="col-md-3 mb-4">
                                <div className="stat-item">
                                    <h3 className="display-6 text-primary fw-bold">{stats.productsCreated?.toLocaleString()}+</h3>
                                    <p className="text-muted">Productos creados</p>
                                </div>
                            </div>
                            <div className="col-md-3 mb-4">
                                <div className="stat-item">
                                    <h3 className="display-6 text-primary fw-bold">{stats.cityLocations}</h3>
                                    <p className="text-muted">Sucursales</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Featured Products Section */}
            {featuredProducts && featuredProducts.length > 0 && (
                <div className="featured-products py-5">
                    <div className="container">
                        <h2 className="text-center mb-5">Productos Destacados</h2>
                        <div className="row">
                            {featuredProducts.map(product => (
                                <div key={product.id} className="col-md-4 mb-4">
                                    <div className="card h-100 shadow-sm">
                                        <div className="card-body text-center">
                                            <i className="fas fa-cookie-bite fa-3x text-primary mb-3"></i>
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text text-primary fw-bold fs-4">
                                                ${product.price?.toLocaleString()}
                                            </p>
                                            <button className="btn btn-primary">Ver Detalles</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}