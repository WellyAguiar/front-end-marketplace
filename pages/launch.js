import { useEffect, useState } from 'react';
import styles from '../styles/Products.module.css';
import Link from 'next/link';

export default function Launch() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/src/products?category=new`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>New Arrivals</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div className={styles.card}>
              <img src={product.imageUrl} alt={product.name} className={styles.image}/>
              <h2>{product.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
