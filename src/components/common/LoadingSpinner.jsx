// Componente de loading para mostrar mientras cargan los datos
// Archivo: src/components/common/LoadingSpinner.jsx

export default function LoadingSpinner({ message = "Cargando..." }) {
    return (
        <div className="loading-container d-flex flex-column justify-content-center align-items-center" 
             style={{ minHeight: "50vh" }}>
            <div className="spinner-border text-primary mb-3" role="status" style={{ width: "3rem", height: "3rem" }}>
                <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="text-muted">{message}</p>
        </div>
    );
}

// Componente de loading para páginas completas
export function FullPageLoader({ message = "Preparando contenido..." }) {
    return (
        <div className="loading-page d-flex flex-column justify-content-center align-items-center" 
             style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
            <div className="text-center text-white">
                <div className="spinner-border mb-4" role="status" style={{ width: "4rem", height: "4rem" }}>
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <h3 className="mb-2">Mil Sabores</h3>
                <p className="opacity-75">{message}</p>
            </div>
        </div>
    );
}

// Componente de loading para secciones específicas
export function SectionLoader({ title = "", message = "Cargando contenido..." }) {
    return (
        <div className="section-loader py-5">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        {title && <h2 className="mb-4">{title}</h2>}
                        <div className="spinner-border text-primary mb-3" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p className="text-muted">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}