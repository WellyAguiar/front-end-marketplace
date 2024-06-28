import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Products.module.css';

export default function Mens() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products?categories=homem,unissex');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    };

    fetchProducts();
  }, []);

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
