import { createBrowserRouter } from "react-router-dom";
import Root from './pages/root'
import Home from './pages/home/index'
import Nosotros from './pages/nosotros/index'
import Productos from './pages/productos/index'
import PersonalizaTuTorta from './pages/personaliza-tu-torta/index'
import Blog from './pages/blog/index'
import Contacto from './pages/contacto/index'
import Register from './pages/register/index'
import Checkout from './pages/checkout/index'
import { homeLoader } from './loaders/homeLoader.jsx'

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
                loader: homeLoader
            },
            {
                path: 'nosotros',
                Component: Nosotros,
                /* loader: nosotrosLoader */
            },
            {
                path: 'productos',
                Component: Productos,
                /* loader: productosLoader */
            },
            {
                path: 'personaliza-tu-torta',
                Component: PersonalizaTuTorta,
                /* loader: personalizaTuTortaLoader */
            },
            {
                path: 'blog',
                Component: Blog,
                /* loader: blogLoader */
            },
            {
                path: 'contacto',
                Component: Contacto,
                /* loader: contactoLoader */
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'checkout',
                Component: Checkout
            }
        ]
    }
]);