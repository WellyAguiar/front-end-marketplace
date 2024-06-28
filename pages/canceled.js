import styles from '../styles/Result.module.css';

export default function Canceled() {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.message} ${styles.canceled}`}>Pagamento cancelado</h1>
      <p className={styles.message}>Você cancelou seu pagamento.</p>
    </div>
  );
}
