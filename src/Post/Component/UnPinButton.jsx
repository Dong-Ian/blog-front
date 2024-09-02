import UnPinFunction from "../Function/UnPinFunction";

import styles from "../Style/post.module.css";

/**
 * 게시글의 고정을 해제하는 버튼을 렌더링하는 컴포넌트
 *
 * @param {Object} props - 컴포넌트의 속성
 * @param {string} props.token - 인증 토큰
 * @param {number} props.postSeq - 게시글 시퀀스 번호
 * @param {Function} props.setChangePinned - 고정 상태를 토글하는 함수
 * @returns {JSX.Element} 고정 해제 버튼을 포함하는 div 요소
 */
function UnPinButton({ token, postSeq, setChangePinned }) {
  /**
   * 게시글의 고정을 해제하는 함수
   * 서버에 요청을 보내고, 성공 시 상태를 업데이트하며, 사용자에게 알림을 표시함
   */
  async function UnPin() {
    const result = await UnPinFunction({ token, postSeq });

    if (result.result) {
      alert("게시글이 고정해제 되었습니다.");
      setChangePinned((prev) => !prev);
      return;
    }

    alert("서버 오류로 게시글이 고정해제되지 않았습니다.");
    return;
  }

  return (
    <div className={styles.btn}>
      <button onClick={UnPin}>고정 해제하기</button>
    </div>
  );
}

export default UnPinButton;
