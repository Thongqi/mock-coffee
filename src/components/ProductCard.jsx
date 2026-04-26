import { useState } from "react";
import styles from "./ProductCard.module.css";

export function ProductCard({ product, handleAddtoCard }) {
  const [added, setAdded] = useState(false);

  return (
    <div key={product.itemID} className={styles.productcard}>
      <img src={product.imageUrl}></img>
      <div>
        <p className={styles.itemname}>{product.itemName}</p>
        <p className={styles.desc}>{product.itemDescription}</p>
        <p className={styles.price}>${product.itemPrice}</p>
      </div>
      {added ? (
        <p className={styles.added}>&#10003; Successfully added to cart</p>
      ) : (
        <p style={{ minHeight: "26px" }}></p>
      )}
      <div className={styles.button}>
        <button
          className={styles.cartbutton}
          onClick={() => {
            handleAddtoCard();
            setAdded(true);
          }}
        >
          Add to Cart
        </button>
        <button>Buy Now</button>
      </div>
    </div>
  );
}
