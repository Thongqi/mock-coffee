import { useNavigate, useOutletContext } from "react-router";
import hero from "../assets/hero.png";
import styles from "./Home.module.css";
import { ProductCard } from "./ProductCard";
import { handleAddtoCard } from "./Shop";
import { useProducts } from "./useProducts";

export function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.left}>
          <p className={styles.title}>Turn Up the Heat</p>
          <p>Authentic Asian Flavours, Crafted Fresh Daily</p>
          <button onClick={() => navigate("/menu")}>Order Now</button>
        </div>
        <div className={styles.right}>
          <img src={hero}></img>
        </div>
      </div>
      <div style={{ margin: "auto" }}>
        <h3>Top 5 Picks</h3>
        <Top5Picks></Top5Picks>
      </div>
    </>
  );
}

function Top5Picks() {
  const { products, error, loading } = useProducts();
  const [cart, setCart] = useOutletContext();

  if (loading) return <p>Simmering something special...</p>;
  if (error) return <p>We couldn’t load the top picks right now.</p>;

  const top5 = products.slice(0, 5);
  return (
    <div className={styles.products}>
      {top5.map((product) => (
        <ProductCard
          key={product.itemID}
          product={product}
          handleAddtoCard={() => handleAddtoCard(product, cart, setCart)}
        ></ProductCard>
      ))}
    </div>
  );
}
