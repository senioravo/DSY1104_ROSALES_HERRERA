import { NavLink, Outlet, useNavigation } from "react-router"
import NavBarRoot from "../components/root/NavBarRoot.jsx";
import "./root.css"


export default function Root() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return (
        <>
            <div className="root-layout">
                <NavBarRoot id="navBarRoot" />
                <main className="main-content">
                    {isLoading ? (
                    <div className="loading-container">
                        <p>Cargando...</p>
                    </div>
                    ) : (
                    <Outlet />
                    )}
                </main>
            </div>
        </>
    )
}