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
        <CartCard product={item} setCart={setCart}></CartCard>
      ))}
    </>
  );
}

export function CartCard({ product, setCart }) {

  function handleAdd(){
    setCart((prev) => 
      prev.map((item) => 
        item.itemID === product.itemID ? {...item, quantity: item.quantity? item.quantity+1: 2} : item
      )
  }

  function handleMinus(){
    setCart((prev) => 
      prev.map((item) => 
        item.itemID === product.itemID ? {...item, quantity: item.quantity? (item.quantity > 0 ? item.quantity - 1 : 0) : 0} : item
      )
  }
  
  function handleRemove(id){
    setCart((prev) => 
      prev.filter((item) => 
        item.itemID !== product.itemID 
      )
  }

  return (
    <div key={item.itemID} className={styles.itemcard}>
      <div>
        <p className={styles.itemname}>{item.itemName}</p>
        <p className={styles.desc}>{item.itemDescription}</p>
        <p className={styles.price}>${item.itemPrice}</p>
        <PlusMinusButton count={item.quantity? item.quantity : 1} handleAdd={handleAdd()} handleMinus={handleMinus()}/>
      </div>
      <img src={item.imageUrl}></img>
      <button className={styles.removebutton} onclick={handleRemove}>&#xd7;</button>
    </div>
  );
}

export function PlusMinusButton({ count, handleMinus, handleAdd }) {
  return (
    <div className={styles.addminusbutton}>
      <button onClick={handleMinus} aria-label="minus">-</button>
      <input type="number" value={count} aria-label="quantity"></input>
      <button onClick={handleAdd} aria-label="add">+</button>
    </div>
  );
}
