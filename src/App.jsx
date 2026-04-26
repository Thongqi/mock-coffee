import { useState } from "react";

import styles from "./App.module.css";
import { Link } from "react-router";
import { Outlet } from "react-router";

export function App() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="menu">Menu</Link>
          </li>
          <li>
            <Link to="cart">
              Cart<span data-testid="cartCount">{cart.length}</span>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet context={[cart, setCart]}></Outlet>
    </>
  );
}

export function ErrorPage() {
  return (
    <div>
      <h1>This page got eaten by the chef 😅</h1>
      <Link to="/">Go back to home page</Link>
    </div>
  );
}
