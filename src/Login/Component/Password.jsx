import styles from "../Style/Login.module.css";

/**
 * 비밀번호 입력을 위한 컴포넌트
 *
 * @component
 * @param {Object} props - 컴포넌트에 전달되는 속성 객체
 * @param {string} props.password - 사용자가 입력한 비밀번호 값
 * @param {Function} props.setPassword - 비밀번호 값을 설정하는 함수
 * @returns {JSX.Element} 비밀번호 입력 필드를 포함한 JSX 엘리먼트
 */
function Password({ password, setPassword }) {
  /**
   * 비밀번호 입력값이 변경될 때 호출되는 핸들러 함수
   *
   * @param {Object} event - 이벤트 객체
   */
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
