import UnPinFunction from "../Function/UnPinFunction";
import styles from "../Style/post.module.css";

function UnPinButton({ token, postSeq, setChangePinned }) {
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
