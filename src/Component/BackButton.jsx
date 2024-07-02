import { useNavigate } from "react-router-dom";

import styles from "./Style/component.module.css";

function BackButton() {
  const navigate = useNavigate();
  return (
    <div className={styles.backbuton} onClick={() => navigate(-1)}>
      <p>{"<"} 뒤로가기</p>
    </div>
  );
}

export default BackButton;
