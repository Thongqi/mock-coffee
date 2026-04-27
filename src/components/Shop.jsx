import { useState, useEffect } from "react";
import { useProducts } from "./useProducts";
import { ProductCard } from "./ProductCard";
import styles from "./Shop.module.css";
import { useOutletContext } from "react-router";

export function Shop() {
  const { products, error, loading } = useProducts();
  const [cart, setCart] = useOutletContext();

  function handleAddtoCard(product) {

    if(cart.some((item)=> item.itemID === product.itemID)){
      setCart((prev) => 
        prev.map((item) => 
          item.itemID === product.itemID ? {...item, quantity: item.quantity? item.quantity+1: 2} : item
        )
      )
    } else setCart((prev) => [...prev, product]);
  }

  if (loading) return <p>Preparing your dishes…</p>;
  if (error) return <p>Oops! We couldn’t load the menu. Please try again.</p>;

  return (
    <div>
      <div className={styles.header}>
        <h2>Our Menu</h2>
        <p>Freshly prepared dishes made daily with authentic Asian flavors.</p>
      </div>
      <div className={styles.products}>
        {products.map((product) => (
          <ProductCard
            key={product.itemID}
            product={product}
            handleAddtoCard={() => handleAddtoCard(product)}
          ></ProductCard>
        ))}
      </div>
    </div>
  );
}
