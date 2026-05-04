import { App, ErrorPage } from "./App.jsx";
import { Shop } from "./components/Shop.jsx";
import { Home } from "./components/Home.jsx";
import { Cart } from "./components/Cart.jsx";
import { OrderConfirmation } from "./components/OrderConfirmation.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "menu",
        element: <Shop />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      { path: "order-success", element: <OrderConfirmation /> },
    ],
  },
];
