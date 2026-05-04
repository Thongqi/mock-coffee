import { Link, useNavigate, useOutletContext } from "react-router";
import styles from "./Cart.module.css";

export function Cart() {
  const [cart, setCart] = useOutletContext();

  if (cart.length < 1)
    return (
      <div className={styles.emptyContainer}>
        <h2>Your plate is empty 🍽️</h2>
        <p>
          Looks like you haven’t picked any dishes yet. Let’s fix that—there’s
          plenty of good food waiting for you.
        </p>

        <Link to="/menu">
          <button>Go to Menu</button>
        </Link>
      </div>
    );
  return (
    <>
      <h2>Your Cart</h2>
      <div className={styles.cartpage}>
        <div className={styles.left}>
          {cart.map((item) => (
            <CartCard product={item} setCart={setCart}></CartCard>
          ))}
        </div>
        <OrderSummary cart={cart} setCart={setCart}></OrderSummary>
      </div>
    </>
  );
}

export function OrderSummary({ cart, setCart }) {
  const navigate = useNavigate();
  const { count, totalPrice } = cart.reduce(
    (acc, current) => {
      acc.count += current.quantity;
      acc.totalPrice += current.itemPrice * current.quantity;
      return acc;
    },
    { count: 0, totalPrice: 0 },
  );

  function handleCheckout() {
    alert("Checkout successfully. Your dishes will be ready soon!");
    navigate("/order-success");
    setCart([]);
  }

  return (
    <div className={styles.right}>
      <div>
        <h3 className={styles.orderbold}>Order Summary</h3>
        <p className={styles.orderbold}>{count} Item(s)</p>
      </div>

      <div>
        <p>Items' total</p>
        <p>{totalPrice}</p>
      </div>
      <div>
        <p>Shipping</p>
        <p>Free</p>
      </div>

      <div>
        <h3 className={styles.orderbold}>Order Total</h3>
        <p className={styles.orderbold}>{totalPrice}</p>
      </div>

      <button onClick={handleCheckout}>Proceed to checkout</button>
    </div>
  );
}

export function CartCard({ product, setCart }) {
  function handleAdd() {
    setCart((prev) =>
      prev.map((item) =>
        item.itemID === product.itemID
          ? { ...item, quantity: item.quantity ? item.quantity + 1 : 2 }
          : item,
      ),
    );
  }

  function handleMinus() {
    if (product.quantity === 1) {
      handleRemove();
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.itemID === product.itemID
            ? {
                ...item,
                quantity: (item.quantity ?? 1) - 1,
              }
            : item,
        ),
      );
    }
  }

  function handleInput(e) {
    if (Number.isNaN(parseInt(e.target.value))) return;
    if (parseInt(e.target.value) === 0) {
      handleRemove();
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.itemID === product.itemID
            ? { ...item, quantity: parseInt(e.target.value) }
            : item,
        ),
      );
    }
  }

  function handleRemove() {
    setCart((prev) =>
      prev.map((item) =>
        item.itemID === product.itemID ? { ...item, isRemoving: true } : item,
      ),
    );

    setTimeout(() => {
      setCart((prev) => prev.filter((item) => item.itemID !== product.itemID));
    }, 1000);
  }

  return (
    <div
      key={product.itemID}
      className={`${styles.itemcard} ${product.isRemoving ? styles.fadeOut : ""}`}
    >
      <div>
        <p className={styles.itemname}>{product.itemName}</p>
        <p className={styles.desc}>{product.itemDescription}</p>
        <p className={styles.price}>${product.itemPrice}</p>
        <PlusMinusButton
          count={product.quantity ?? 1}
          handleAdd={handleAdd}
          handleMinus={handleMinus}
          handleInput={handleInput}
        />
      </div>
      <img src={product.imageUrl}></img>
      <button className={styles.removebutton} onClick={handleRemove}>
        &#xd7;
      </button>
    </div>
  );
}

export function PlusMinusButton({
  count,
  handleMinus,
  handleAdd,
  handleInput,
}) {
  return (
    <div className={styles.addminusbutton}>
      <button onClick={handleMinus} aria-label="minus">
        -
      </button>
      <input
        type="text"
        inputMode="numeric"
        pattern="\d*"
        value={count}
        aria-label="quantity"
        onChange={handleInput}
      ></input>
      <button onClick={handleAdd} aria-label="add">
        +
      </button>
    </div>
  );
}
