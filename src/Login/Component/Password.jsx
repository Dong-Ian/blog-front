import styles from "../Style/Login.module.css";

function Password({ password, setPassword }) {
  function handlePassword(event) {
    const {
      target: { value },
    } = event;
    setPassword(value);
  }

  return (
    <div className={styles.input}>
      <p>비밀번호</p>
      <input
        onChange={handlePassword}
        type="password"
        placeholder="Password"
        name="password"
        value={password}
      />
    </div>
  );
}

export default Password;
