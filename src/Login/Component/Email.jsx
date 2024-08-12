import styles from "../Style/Login.module.css";

function Email({ email, setEmail }) {
  function handleEmail(event) {
    const {
      target: { value },
    } = event;
    setEmail(value);
  }

  return (
    <div className={styles.input}>
      <p>이메일</p>
      <input
        onChange={handleEmail}
        type="text"
        placeholder="Email"
        name="email"
        value={email}
      />
    </div>
  );
}

export default Email;
