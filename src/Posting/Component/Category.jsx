import styles from "../Style/Posting.module.css";

/**
 * 카테고리 입력을 처리하는 컴포넌트
 *
 * 이 컴포넌트는 사용자가 카테고리를 입력할 수 있는 입력 필드를 렌더링하고,
 * 입력된 값을 부모 컴포넌트로 전달하는 함수 `handleInput`을 포함한다.
 *
 * @component
 * @param {Object} props - 컴포넌트의 속성
 * @param {string} props.category - 현재 선택된 카테고리 값
 * @param {Function} props.setCategory - 카테고리 값을 설정하는 함수
 */
function Catetory({ category, setCategory }) {
  /**
   * 입력 필드의 변경 이벤트를 처리하는 함수
   *
   * 사용자가 입력 필드에 값을 입력하면 이 함수가 호출되어
   * 입력된 값을 `setCategory` 함수를 통해 부모 컴포넌트에 전달한다.
   *
   * @param {Event} event - 입력 이벤트 객체
   */
  function handleInput(event) {
    const {
      target: { value }, // 입력 필드의 현재 값
    } = event;
    setCategory(value); // 부모 컴포넌트에 카테고리 값 전달
  }

  return (
    <div className={styles.category}>
      <input
        name="category" // 입력 필드의 이름
        onChange={handleInput} // 입력 필드 값이 변경될 때 호출될 함수
        placeholder="카테고리를 입력해주세요" // 입력 필드의 플레이스홀더 텍스트
        value={category} // 입력 필드의 현재 값
      />
    </div>
  );
}

export default Catetory;
