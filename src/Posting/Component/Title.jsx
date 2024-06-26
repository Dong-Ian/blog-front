import styles from "../Style/Posting.module.css";

function Title({ title, setTitle }) {
  function handleInput(event) {
    const {
      target: { value },
    } = event;
    setTitle(value);
  }

  return (
    <div className={styles.title}>
      <input
        name="title"
        onChange={handleInput}
        placeholder="제목을 입력해주세요"
        value={title}
      />
    </div>
  );
}

export default Title;
