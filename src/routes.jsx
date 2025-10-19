import { createBrowserRouter } from "react-router-dom";
import Root from './pages/root'
import Home from './pages/home/index'
import Nosotros from './pages/nosotros/index'
import Productos from './pages/productos/index'
import PersonalizaTuTorta from './pages/personaliza-tu-torta/index'
import Blog from './pages/blog/index'
import Articulo from './pages/blog/articulo'
import Contacto from './pages/contacto/index'

// Solo importar los loaders que realmente necesitamos
import {
  blogLoader,
  articuloLoader
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
                Component: Home
                // Sin loader - página simple
            },
            {
                path: 'nosotros',
                Component: Nosotros
                // Sin loader - página simple
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
                Component: Articulo,
                loader: articuloLoader  // Solo los artículos usan loader
            },
            {
                path: 'contacto',
                Component: Contacto
                // Sin loader - página simple
            }
        ]
    }
]);