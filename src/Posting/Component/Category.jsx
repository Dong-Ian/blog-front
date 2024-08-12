import styles from "../Style/Posting.module.css";

function Catetory({ category, setCategory }) {
  function handleInput(event) {
    const {
      target: { value },
    } = event;
    setCategory(value);
  }

  return (
    <div className={styles.category}>
      <input
        name="category"
        onChange={handleInput}
        placeholder="카테고리를 입력해주세요"
        value={category}
      />
    </div>
  );
}

export default Catetory;
