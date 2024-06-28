import { useCart } from '../context/CartContext';
import styles from './Cart.module.css';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Cart({ isOpen, toggleCart }) {
  const { cartItems, total, clearCart, removeFromCart } = useCart();

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      const response = await axios.post('/api/create-checkout-session', {
        cartItems,
      });

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Axios error:', error);
    }
  };

  return (
    <div className={`${styles.cart} ${isOpen ? styles.cartOpen : ''}`}>
      <button onClick={toggleCart} className={styles.closeButton}>X</button>
      <h2>Carrinho de Compras</h2>
      {cartItems.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.imageUrl} alt={item.name} className={styles.cartImage} />
              <div>
                <p>{item.name}</p>
                <p>R$ {item.price},00</p>
                <p>Quantidade: {item.quantity}</p>
                <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>Remover</button>
              </div>
            </div>
          ))}
          <div className={styles.cartTotal}>
            <strong>Total:</strong> R$ {total},00
          </div>
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
}
