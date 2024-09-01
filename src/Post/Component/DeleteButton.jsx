import { useNavigate } from "react-router-dom";

import styles from "../Style/post.module.css";

import DeletePostFunction from "../Function/DeletePostFunction";

/**
 * 게시물을 삭제하는 버튼 컴포넌트
 *
 * @param {Object} props - 컴포넌트의 속성
 * @param {string} props.token - 인증 토큰
 * @param {number} props.postSeq - 게시물 시퀀스 번호
 * @returns {JSX.Element} 삭제 버튼을 포함하는 div 요소
 */
function DeleteButton({ token, postSeq }) {
  const navigate = useNavigate();

  /**
   * 게시물을 삭제하는 함수
   *
   * 사용자가 삭제 확인을 하면 DeletePostFunction을 호출하여 게시물 삭제를 시도
   * 삭제 성공 시 알림을 표시하고 게시물 목록 페이지로 네비게이션
   * 삭제 실패 시 실패 알림을 표시
   */
  async function DeletePost() {
    if (window.confirm("글을 삭제하시겠습니까?")) {
      const result = await DeletePostFunction({ token, postSeq });
      if (result.result) {
        alert("삭제되었습니다.");
        navigate("/postlist");
        return;
      }

      alert("삭제가 완료되지 않았습니다.");
      return;
    }

    return;
  }

  return (
    <div className={styles.btn}>
      <button onClick={DeletePost}>삭제</button>
    </div>
  );
}

export default DeleteButton;
