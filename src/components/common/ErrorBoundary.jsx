// Componente para manejar errores de loaders
// Archivo: src/components/common/ErrorBoundary.jsx

import { useRouteError, Link } from "react-router-dom";

export default function ErrorBoundary() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="error-page d-flex flex-column justify-content-center align-items-center" 
             style={{ minHeight: "100vh", background: "#f8f9fa" }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 text-center">
                        <div className="error-content">
                            <i className="fas fa-exclamation-triangle text-warning fa-4x mb-4"></i>
                            <h1 className="display-4 mb-3">¡Oops!</h1>
                            <h2 className="h4 mb-4">Algo salió mal</h2>
                            <p className="text-muted mb-4">
                                {error?.statusText || error?.message || 
                                 "Ha ocurrido un error inesperado. Por favor, intenta nuevamente."}
                            </p>
                            <div className="d-flex justify-content-center gap-3">
                                <button 
                                    onClick={() => window.history.back()} 
                                    className="btn btn-outline-primary"
                                >
                                    <i className="fas fa-arrow-left me-2"></i>
                                    Volver
                                </button>
                                <Link to="/" className="btn btn-primary">
                                    <i className="fas fa-home me-2"></i>
                                    Ir al Inicio
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Componente para errores específicos de páginas
export function PageError({ title = "Error", message = "Ha ocurrido un problema", showRetry = true }) {
    return (
        <div className="page-error py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                        <i className="fas fa-exclamation-circle text-danger fa-3x mb-3"></i>
                        <h2 className="mb-3">{title}</h2>
                        <p className="text-muted mb-4">{message}</p>
                        {showRetry && (
                            <button 
                                onClick={() => window.location.reload()} 
                                className="btn btn-primary"
                            >
                                <i className="fas fa-redo me-2"></i>
                                Intentar nuevamente
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}