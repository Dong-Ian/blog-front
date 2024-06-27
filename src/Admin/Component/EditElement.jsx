import styles from "../Style/admin.module.css";

function EditElement({ placeholder, text, getter, setter }) {
  function handleInput(event) {
    const {
      target: { value },
    } = event;
    setter(value);
  }

  return (
    <div className={styles.input_element}>
      <div>
        <p>{text}</p>
      </div>
      <input
        placeholder={placeholder}
        value={getter}
        onChange={handleInput}
        name={getter}
      />
    </div>
  );
}

export default EditElement;
