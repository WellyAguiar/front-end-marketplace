import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Products.module.css';

export default function Womens() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/src/products?categories=mulher,unissex`);
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Roupas Femininas</h1>
      {error && <p className={styles.error}>{error}</p>}
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
