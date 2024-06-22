import PinFunction from "../Function/PinFunction";
import styles from "../Style/post.module.css";

function PinButton({ token, postSeq, setChangePinned }) {
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
