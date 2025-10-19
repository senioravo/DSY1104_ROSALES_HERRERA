import { Outlet, useNavigation, useLocation } from "react-router-dom"
import NavBarRoot from "../components/root/NavBarRoot.jsx";
import FooterRoot from "../components/root/FooterRoot.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import "./root.css"


export default function Root() {
    const navigation = useNavigation();
    const location = useLocation();
    const isLoading = navigation.state === "loading";

    // Mensajes personalizados según la ruta
    const getLoadingMessage = () => {
        const path = navigation.location?.pathname || location.pathname;
        switch (path) {
            case '/':
                return "Cargando página principal...";
            case '/nosotros':
                return "Cargando información de la empresa...";
            case '/productos':
                return "Cargando catálogo de productos...";
            case '/blog':
                return "Cargando artículos del blog...";
            case '/contacto':
                return "Cargando información de contacto...";
            default:
                return path?.includes('/blog/') ? 
                    "Cargando artículo..." : 
                    "Cargando contenido...";
        }
    };

    return (
        <div className="root-layout">
            <NavBarRoot />
            <main className="main-content">
                {isLoading ? (
                    <LoadingSpinner message={getLoadingMessage()} />
                ) : (
                    <Outlet />
                )}
            </main>
            <FooterRoot />
        </div>
    )
}