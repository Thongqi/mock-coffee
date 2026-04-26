import { Link, useOutletContext } from "react-router";
import styles from "./Cart.module.css";

export function Cart() {
  const [cart, setCart] = useOutletContext();

  if (cart.length < 1)
    return (
      <div>
        <h1>Your plate is empty 🍽️</h1>
        <p>
          Looks like you haven’t picked any dishes yet. Let’s fix that—there’s
          plenty of good food waiting for you.
        </p>
        <button>
          <Link to="/menu">Go to Menu</Link>
        </button>
      </div>
    );
  return (
    <>
      <h1>Your Cart</h1>
      {cart.map((item) => (
        <CartCard item={item}></CartCard>
      ))}
    </>
  );
}

export function CartCard({ item }) {
  return (
    <div key={item.itemID} className={styles.itemcard}>
      <div>
        <p className={styles.itemname}>{item.itemName}</p>
        <p className={styles.desc}>{item.itemDescription}</p>
        <p className={styles.price}>${item.itemPrice}</p>
      </div>
      <img src={item.imageUrl}></img>
    </div>
  );
}

export function PlusMinusButton({ count }) {
  return (
    <div>
      <button>-</button>
      <input type="number" value={count}></input>
      <button>+</button>
    </div>
  );
}
