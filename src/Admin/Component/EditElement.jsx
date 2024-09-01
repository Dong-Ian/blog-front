import styles from "../Style/admin.module.css";

/**
 * 입력 필드와 라벨을 렌더링하는 컴포넌트
 *
 * 사용자가 입력 필드를 통해 값을 수정할 수 있게 해줍니다.
 * 입력 값은 부모 컴포넌트의 상태를 업데이트합니다.
 *
 * @param {Object} props - 컴포넌트에 전달되는 속성
 * @param {string} props.placeholder - 입력 필드의 플레이스홀더 텍스트
 * @param {string} props.text - 입력 필드 위에 표시될 라벨 텍스트
 * @param {string} props.getter - 현재 입력 필드의 값
 * @param {Function} props.setter - 입력 필드 값을 업데이트하는 함수
 * @returns {JSX.Element} - 입력 필드와 라벨 UI
 */
function EditElement({ placeholder, text, getter, setter }) {
  /**
   * 입력 필드의 값이 변경될 때 호출되는 핸들러
   *
   * 입력 필드의 값을 `setter` 함수를 통해 업데이트
   *
   * @param {Event} event - 입력 필드의 값이 변경된 이벤트
   */
  function handleInput(event) {
    const {
      target: { value },
    } = event;
    setter(value); // 입력 필드의 값을 부모 컴포넌트의 상태로 설정합니다.
  }

  return (
    <div className={styles.input_element}>
      <div>
        <p>{text}</p> {/* 입력 필드 위에 표시될 라벨 텍스트 */}
      </div>
      <input
        placeholder={placeholder} // 입력 필드의 플레이스홀더 텍스트
        value={getter} // 현재 입력 필드의 값
        onChange={handleInput} // 값이 변경될 때 호출될 핸들러
        name={getter} // 입력 필드의 이름 속성
      />
    </div>
  );
}

export default EditElement;
