import { createBrowserRouter } from "react-router-dom";
import Root from './pages/root'
import Home from './pages/home/index'

export const router = createBrowserRouter([
    {
        path: '/',
        component: Root,
        children: [
            {
                index: true,
                component: Home
                /* loader: homeLoader */
            }
        ]
    }
]);