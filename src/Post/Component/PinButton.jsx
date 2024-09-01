import styles from "../Style/post.module.css";
import PinFunction from "../Function/PinFunction";

/**
 * 게시글을 고정하는 버튼 컴포넌트
 *
 * @param {Object} props - 컴포넌트의 속성
 * @param {string} props.token - 인증 토큰
 * @param {number} props.postSeq - 게시글의 고유 식별자
 * @param {Function} props.setChangePinned - 게시글 고정 상태를 변경하는 함수
 * @returns {JSX.Element} 게시글 고정 버튼을 포함하는 div 요소
 */
function PinButton({ token, postSeq, setChangePinned }) {
  /**
   * 게시글을 고정하는 함수
   * 서버에 요청을 보내고, 성공 시 게시글 고정 상태를 반영
   */
  async function Pin() {
    const result = await PinFunction({ token, postSeq });

    if (result.result) {
      alert("게시글이 고정되었습니다.");
      setChangePinned((prev) => !prev);
      return;
    }

    alert("서버 오류로 게시글이 고정되지 않았습니다.");
    return;
  }

  return (
    <div className={styles.btn}>
      <button onClick={Pin}>게시글 고정하기</button>
    </div>
  );
}

export default PinButton;
