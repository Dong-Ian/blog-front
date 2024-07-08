import Contents from "../../Post/Component/Contents";
import Title from "../../Post/Component/Title";
import styles from "../Style/Posting.module.css";

function Preview({ title, category, tag, contents }) {
  return (
    <div className={styles.preview_box}>
      <div className={styles.category}>
        <p>{category}</p>
      </div>

      <Title title={title} />
      <Contents post={contents} />
    </div>
  );
}

export default Preview;
