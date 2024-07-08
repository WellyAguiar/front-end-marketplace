import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Products.module.css';

export default function Mens() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/src/products?categories=homem,unissex`);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Men's Clothing</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id} legacyBehavior>
            <a className={styles.card}>
              <img src={product.imageUrl} alt={product.name} className={styles.image} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p><strong>Price:</strong> ${product.price}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
