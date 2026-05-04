import { useProducts } from "./useProducts";
import { ProductCard } from "./ProductCard";
import styles from "./Shop.module.css";
import { useOutletContext } from "react-router";

export function Shop() {
  const { products, error, loading } = useProducts();
  const [cart, setCart] = useOutletContext();

  if (loading) return <p className={styles.msg}>Preparing the dishes…</p>;
  if (error)
    return (
      <p className={styles.msg}>
        Oops! We couldn’t load the menu. Please try again.
      </p>
    );

  return (
    <div style={{ margin: "auto" }}>
      <div className={styles.header}>
        <h2>Our Menu</h2>
        <p>Freshly prepared dishes made daily with authentic Asian flavors.</p>
      </div>
      <div className={styles.products}>
        {products.map((product) => (
          <ProductCard
            key={product.itemID}
            product={product}
            handleAddtoCard={() => handleAddtoCard(product, cart, setCart)}
          ></ProductCard>
        ))}
      </div>
    </div>
  );
}

export function handleAddtoCard(product, cart, setCart) {
  if (cart.some((item) => item.itemID === product.itemID)) {
    setCart((prev) =>
      prev.map((item) =>
        item.itemID === product.itemID
          ? {
              ...item,
              quantity: item.quantity ? item.quantity + 1 : 2,
              isRemoving: false,
            }
          : item,
      ),
    );
  } else setCart((prev) => [...prev, { ...product, quantity: 1 }]);
}
