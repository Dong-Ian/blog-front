import { useState } from "react";
import styles from "../Style/Posting.module.css";

/**
 * Tag 컴포넌트
 *
 * 이 컴포넌트는 사용자가 태그를 입력하고 추가하며,
 * 기존 태그를 삭제할 수 있는 기능을 제공합니다.
 *
 * @param {Object} props - 컴포넌트의 속성
 * @param {Array<string>} props.tag - 현재 태그 목록
 * @param {Function} props.setTag - 태그 목록을 업데이트하는 함수
 * @returns {JSX.Element} - 태그 입력 필드와 태그 목록을 렌더링한 JSX 요소
 */
function Tag({ tag, setTag }) {
  // 입력 필드의 태그 값을 관리하는 상태
  const [tagElement, setTagElement] = useState("");

  /**
   * 입력 필드의 값이 변경될 때 호출되는 핸들러
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - 입력 이벤트
   */
  function handleTag(event) {
    const {
      target: { value },
    } = event;
    setTagElement(value);
  }

  /**
   * 키 입력이 발생할 때 호출되는 핸들러
   * Enter 키 또는 Space 키를 누르면 태그를 추가합니다.
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} event - 키보드 이벤트
   */
  function handleKeyPress(event) {
    if (
      (event.key === "Enter" || event.key === " ") &&
      tagElement.trim() !== ""
    ) {
      setTag((prevTags) => [...prevTags, tagElement]);
      setTagElement(""); // 입력 필드 비우기
    }
  }

  /**
   * 특정 태그를 삭제하는 핸들러
   *
   * @param {number} index - 삭제할 태그의 인덱스
   */
  function handleClearClick(index) {
    setTag((prevTags) => prevTags.filter((_, i) => i !== index));
  }

  /**
   * 태그 목록을 렌더링하는 함수
   *
   * @returns {JSX.Element[]} - 태그와 삭제 버튼을 포함한 JSX 요소 배열
   */
  function TagRender() {
    return tag.map((tag, index) => {
      return (
        <div className={styles.tag_box} key={index}>
          <p>{tag}</p>
          <button onClick={() => handleClearClick(index)}>x</button>
        </div>
      );
    });
  }

  return (
    <div className={styles.tag}>
      <TagRender />
      <input
        placeholder="태그를 입력해주세요"
        value={tagElement}
        onChange={handleTag}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

export default Tag;
