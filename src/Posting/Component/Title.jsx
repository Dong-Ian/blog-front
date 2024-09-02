import styles from "../Style/Posting.module.css";

/**
 * Title 컴포넌트
 *
 * 이 컴포넌트는 게시글의 제목을 입력받는 입력 필드를 제공합니다.
 * 입력된 제목은 부모 컴포넌트에서 관리할 수 있도록 콜백 함수를 통해 상태를 업데이트합니다.
 *
 * @param {Object} props - 컴포넌트의 속성
 * @param {string} props.title - 현재 제목 값
 * @param {Function} props.setTitle - 제목 값을 업데이트하는 함수
 * @returns {JSX.Element} - 제목 입력 필드를 포함한 JSX 요소
 */
function Title({ title, setTitle }) {
  /**
   * 입력 필드의 값이 변경될 때 호출되는 핸들러
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - 입력 이벤트
   */
  function handleInput(event) {
    const {
      target: { value },
    } = event;
    setTitle(value); // 부모 컴포넌트의 상태를 업데이트
  }

  return (
    <div className={styles.title}>
      <input
        name="title"
        onChange={handleInput} // 입력 필드의 값 변경 시 handleInput 호출
        placeholder="제목을 입력해주세요" // 입력 필드의 플레이스홀더 텍스트
        value={title} // 입력 필드의 현재 값
      />
    </div>
  );
}

export default Title;
