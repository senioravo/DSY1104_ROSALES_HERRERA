import { Outlet, useNavigation } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBarRoot from "../components/root/NavBarRoot.jsx";
import FooterRoot from "../components/root/FooterRoot.jsx";
import "./root.css"


export default function Root() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return (
        <div className="root-layout">
            <NavBarRoot />
            <main className="main-content">
                {isLoading ? (
                <div className="loading-container">
                    <p>Cargando...</p>
                </div>
                ) : (
                <Outlet />
                )}
            </main>
            
            <FooterRoot />
        </div>
    )
}