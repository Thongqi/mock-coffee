import { useState, useEffect } from "react";

export function useProducts() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/api/Restaurant/14/menu")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Opps some error encounter: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return { products, error, loading };
}
