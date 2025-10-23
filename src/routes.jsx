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

// Solo importar los loaders que realmente necesitamos
import {
  blogLoader,
  articuloLoader,
  contactoLoader,
  nosotrosLoader
} from "./loaders";

import { homeLoader } from './loaders/homeLoader.jsx'

// Importar componente de error
import ErrorBoundary from "./components/common/ErrorBoundary";

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
                Component: PersonalizaTuTorta
                // Sin loader - página simple
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
                Component: MensajesContacto
                // Página para ver mensajes guardados en localStorage
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    }
]);