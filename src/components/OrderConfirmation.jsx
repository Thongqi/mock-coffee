import styles from "./OrderConfirmation.module.css";

export function OrderConfirmation() {
  const orderID = crypto.randomUUID();
  return (
    <div className={styles.orderConfirmed}>
      <h2 className={styles.title}>Order Confirmed!</h2>
      <p>Your order is being prepared.</p>
      <p className={styles.orderID}>Order ID: {orderID.slice(0, 8)}</p>
      <p className={styles.time}>Estimated ready in 25-30 minutes</p>
    </div>
  );
}
