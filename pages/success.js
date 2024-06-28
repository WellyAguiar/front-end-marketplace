import styles from '../styles/Result.module.css';

export default function Success() {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.message} ${styles.success}`}>Pagamento bem-sucedido!</h1>
      <p className={styles.message}>Obrigado por sua compra.</p>
    </div>
  );
}
