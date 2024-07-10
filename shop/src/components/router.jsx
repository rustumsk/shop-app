import { createBrowserRouter } from "react-router-dom"
import Home from "./Home.jsx"
import Shop from "./Shop.jsx";
import Cart from "./Cart.jsx";
import App from "./App.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "shop",
                element: <Shop />
            },
            {
                path: "cart",
                element: <Cart />
            }
        ]
    }

])

export default router;