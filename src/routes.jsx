import { createBrowserRouter } from "react-router-dom";
import Root from './pages/root'
import Home from './pages/home/index'
import Nosotros from './pages/nosotros/index'
import Productos from './pages/productos/index'
import PersonalizaTuTorta from './pages/personaliza-tu-torta/index'
import Blog from './pages/blog/index'
import Articulo from './pages/blog/articulo'
import Contacto from './pages/contacto/index'

// Importar todos los loaders
// Importar todos los loaders
import {
  homeLoader,
  nosotrosLoader,
  productosLoader,
  personalizaTuTortaLoader,
  blogLoader,
  articuloLoader,
  contactoLoader
} from "./loaders";

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
                loader: nosotrosLoader
            },
            {
                path: 'productos',
                Component: Productos,
                loader: productosLoader
            },
            {
                path: 'personaliza-tu-torta',
                Component: PersonalizaTuTorta,
                loader: personalizaTuTortaLoader
            },
            {
                path: 'blog',
                Component: Blog,
                loader: blogLoader
            },
            {
                path: 'blog/:slug',
                Component: Articulo,
                loader: articuloLoader
            },
            {
                path: 'contacto',
                Component: Contacto,
                loader: contactoLoader
            }
        ]
    }
]);