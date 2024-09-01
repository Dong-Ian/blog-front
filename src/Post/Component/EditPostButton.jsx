import { useNavigate } from "react-router-dom";

import styles from "../Style/post.module.css";

/**
 * 게시물을 수정하는 버튼 컴포넌트
 *
 * @param {Object} props - 컴포넌트의 속성
 * @param {number} props.postSeq - 게시물 시퀀스 번호
 * @returns {JSX.Element} 수정 버튼을 포함하는 div 요소
 */
function EditPostButton({ postSeq }) {
  const navigate = useNavigate();

  return (
    <div className={styles.btn}>
      <button onClick={() => navigate(`/edit/${postSeq}`)}>수정</button>
    </div>
  );
}

export default EditPostButton;
