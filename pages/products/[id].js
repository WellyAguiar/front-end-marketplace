import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from '../../styles/Product.module.css';

export default function Product() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/src/products?id=${id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch product');
          }
          const data = await res.json();
          setProduct(data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  // Ensure quantities is defined and is an array
  const quantities = product.quantities || [];
  const totalQuantity = quantities.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={product.imageUrl} alt={product.name} className={styles.image} />
      </div>
      <div className={styles.details}>
        <h1>{product.name}</h1>
        <p><strong>Price:</strong> R$ {product.price},00</p>
        <p><strong>Quantidade Disponível:</strong> {totalQuantity}</p>
        <p><strong>Tamanho:</strong> {product.size}</p>
        <p><strong>Cor:</strong> {product.color}</p>
        <p>{product.description}</p>
        <div className={styles.buttonContainer}>
          <button className={`${styles.button} ${styles.addToCart}`} onClick={handleAddToCart}>
            Adicionar ao Carrinho
          </button>
          <button className={`${styles.button} ${styles.buyNow}`}>Comprar Agora</button>
        </div>
      </div>
    </div>
  );
}
