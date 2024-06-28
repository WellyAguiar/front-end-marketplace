import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cartIcon from './shopping_basket.png';
import supportIcon from './support.png';
import styles from './Navbar.module.css';
import dynamic from 'next/dynamic';

const Cart = dynamic(() => import('../components/Cart'), { ssr: false });

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/" legacyBehavior>
            <a>Home</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/launch" legacyBehavior>
            <a>New Arrivals</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/mens" legacyBehavior>
            <a>Men</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/womens" legacyBehavior>
            <a>Women</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/contact" legacyBehavior>
            <a>Contact</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/admin/create-product" legacyBehavior>
            <a>Add Product</a>
          </Link>
        </li>
      </ul>
      <div className={styles.navIcons}>
        <button className={styles.cartButton} onClick={toggleCart}>
          <Image src={cartIcon} alt="Carrinho" width={24} height={24} />
        </button>
        <Link href="/support" legacyBehavior>
          <a>
            <Image src={supportIcon} alt="Suporte" width={24} height={24} />
          </a>
        </Link>
      </div>
      {mounted && <Cart isOpen={cartOpen} toggleCart={toggleCart} />}
    </nav>
  );
}
