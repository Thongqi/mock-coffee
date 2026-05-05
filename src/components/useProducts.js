import { useState, useEffect } from "react";

export function useProducts() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakerestaurantapi.runasp.net/api/Restaurant/items?limit=5", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const text = await res.text();
        console.log(text);
        if (!res.ok) {
          throw new Error(`Opps some error encounter: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return { products, error, loading };
}
