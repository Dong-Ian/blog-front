import { useEffect } from "react";

import { useRecoilValue } from "recoil";
import { tokenState } from "../../Utils/Atom";

import styles from "../Style/admin.module.css";

import EditColorFunction from "../Function/EditColorFunction";

import SketchPicker from "react-color";

function EditColor({ state, setState, setColor }) {
  const token = useRecoilValue(tokenState);

  function handleChangeComplete(color) {
    setState({ background: color.hex });
  }

  async function onClickEditBtn(e) {
    e.preventDefault();
    const result = await EditColorFunction({ token: token, color: state });

    if (result.result) {
      alert("색상이 변경되었습니다.");
      setColor(state);

      return;
    }

    alert("오류가 발생했습니다.");

    return;
  }

  return (
    <div className={styles.change_color}>
      <div>
        <SketchPicker
          color={state.background}
          onChangeComplete={handleChangeComplete}
        />
      </div>
      <div className={styles.change_button}>
        <button onClick={onClickEditBtn}>대표 색상 수정</button>
      </div>
    </div>
  );
}

export default EditColor;
