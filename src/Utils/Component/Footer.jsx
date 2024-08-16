import styles from "./Utils.module.css";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className={styles.footer}>
      <p>Copyright {year}. Dong, Ian All Rights Reserved.</p>
    </div>
  );
}

export default Footer;
