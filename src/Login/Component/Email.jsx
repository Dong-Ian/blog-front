import styles from "../Style/Login.module.css";

/**
 * 이메일 입력을 위한 컴포넌트
 *
 * @component
 * @param {Object} props - 컴포넌트에 전달되는 속성 객체
 * @param {string} props.email - 사용자가 입력한 이메일 값
 * @param {Function} props.setEmail - 이메일 값을 설정하는 함수
 * @returns {JSX.Element} 이메일 입력 필드를 포함한 JSX 엘리먼트
 */
function Email({ email, setEmail }) {
  /**
   * 이메일 입력값이 변경될 때 호출되는 핸들러 함수
   *
   * @param {Object} event - 이벤트 객체
   */
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
