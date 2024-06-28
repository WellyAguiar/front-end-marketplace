import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { CartProvider } from '@/context/CartContext';

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Navbar />
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
