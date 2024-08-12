import { useNavigate } from "react-router-dom";

import styles from "../Style/post.module.css";

import DeletePostFunction from "../Function/DeletePostFunction";

function DeleteButton({ token, postSeq }) {
  const navigate = useNavigate();

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
