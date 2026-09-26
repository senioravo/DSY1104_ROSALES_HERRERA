import { createBrowserRouter } from "react-router-dom";
import Root from './pages/root'
import Home from './pages/home/index'
import Nosotros from './pages/nosotros/index'
import Productos from './pages/productos/index'
import PersonalizaTuTorta from './pages/personaliza-tu-torta/index'
import Blog from './pages/blog/index'
import Articulo from './pages/blog/articulo'
import Contacto from './pages/contacto/index'
import MensajesContacto from './pages/mensajes-contacto/index'
import Register from './pages/register/index'
import Checkout from './pages/checkout/index'
import CheckoutResult from './pages/checkout/Result'
import TestIndex from './pages/test-index/index'
import TestProductos from './pages/test-productos/index'
import TestUsuarios from './pages/test-usuarios/index'
import TestCarrito from './pages/test-carrito/index'
import TestVentas from './pages/test-ventas/index'

// Solo importar los loaders que realmente necesitamos
import {
  homeLoader,
  blogLoader,
  articuloLoader,
  contactoLoader,
  nosotrosLoader
} from "./loaders";

// Importar componente de error
import ErrorBoundary from "./components/common/ErrorBoundary";
import { withMsalGuard } from "./components/auth/withMsalGuard";
import { CLIENTE_ACCESS, ADMIN_ACCESS, SUPERVISOR_ACCESS } from "./config/appRoles";
import AdminPanel from './pages/admin/index';
import SupervisorPanel from './pages/supervisor/index';

const ProtectedCheckout = withMsalGuard(Checkout, { roles: CLIENTE_ACCESS });
const ProtectedCheckoutResult = withMsalGuard(CheckoutResult, { roles: CLIENTE_ACCESS });
const ProtectedPersonaliza = withMsalGuard(PersonalizaTuTorta, { roles: CLIENTE_ACCESS });
const ProtectedMensajes = withMsalGuard(MensajesContacto);

const ProtectedAdminPanel = withMsalGuard(AdminPanel, { roles: ADMIN_ACCESS });
const ProtectedSupervisorPanel = withMsalGuard(SupervisorPanel, { roles: SUPERVISOR_ACCESS });
const ProtectedTestIndex = withMsalGuard(TestIndex, { roles: ADMIN_ACCESS });
const ProtectedTestProductos = withMsalGuard(TestProductos, { roles: ADMIN_ACCESS });
const ProtectedTestUsuarios = withMsalGuard(TestUsuarios, { roles: ADMIN_ACCESS });
const ProtectedTestCarrito = withMsalGuard(TestCarrito, { roles: ADMIN_ACCESS });
const ProtectedTestVentas = withMsalGuard(TestVentas, { roles: SUPERVISOR_ACCESS });

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                Component: Home,
                loader: homeLoader
            },
            {
                path: 'nosotros',
                Component: Nosotros,
                loader: nosotrosLoader  // ✅ AHORA TAMBIÉN USA LOADER!
                // Carga timeline, misión, valores dinámicamente
            },
            {
                path: 'productos',
                Component: Productos
                // Sin loader - página simple
            },
            {
                path: 'personaliza-tu-torta',
                Component: ProtectedPersonaliza
            },
            {
                path: 'blog',
                Component: Blog,
                loader: blogLoader  // Solo el blog usa loader
            },
            {
                path: 'blog/:slug',
                Component: Articulo
                // loader: articuloLoader  // TEMPORALMENTE COMENTADO PARA DEBUGGING
            },
            {
                path: 'contacto',
                Component: Contacto,
                loader: contactoLoader  // ✅ AHORA USA LOADER!
                // Carga datos dinámicos de JSON
            },
            {
                path: 'mensajes-contacto',
                Component: ProtectedMensajes
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'checkout',
                Component: ProtectedCheckout
            },
            {
                path: 'checkout/result',
                Component: ProtectedCheckoutResult
            },
            {
                path: 'admin',
                Component: ProtectedAdminPanel
            },
            {
                path: 'supervisor',
                Component: ProtectedSupervisorPanel
            },
            {
                path: 'test-api',
                Component: ProtectedTestIndex
            },
            {
                path: 'test-productos',
                Component: ProtectedTestProductos
            },
            {
                path: 'test-usuarios',
                Component: ProtectedTestUsuarios
            },
            {
                path: 'test-carrito',
                Component: ProtectedTestCarrito
            },
            {
                path: 'test-ventas',
                Component: ProtectedTestVentas
            }
        ]
    }
]);