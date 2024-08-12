import styles from "../Style/post.module.css";

function Title({ title }) {
  return (
    <div className={styles.title}>
      <p>{title}</p>
    </div>
  );
}

export default Title;
