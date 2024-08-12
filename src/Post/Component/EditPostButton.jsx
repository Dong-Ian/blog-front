import { useNavigate } from "react-router-dom";

import styles from "../Style/post.module.css";

function EditPostButton({ postSeq }) {
  const navitage = useNavigate();

  return (
    <div className={styles.btn}>
      <button onClick={() => navitage(`/edit/${postSeq}`)}>수정</button>
    </div>
  );
}

export default EditPostButton;
