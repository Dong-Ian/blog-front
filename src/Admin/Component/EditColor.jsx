import { useRecoilValue } from "recoil";
import { tokenState } from "../../Utils/Atom";

import EditColorFunction from "../Function/EditColorFunction";

import SketchPicker from "react-color";
import { useEffect } from "react";

function EditColor({ state, color, setState, setColor }) {
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

  useEffect(() => {
    console.log(state);
  }, []);

  return (
    <div>
      <SketchPicker
        color={state.background}
        onChangeComplete={handleChangeComplete}
      />
      <button onClick={onClickEditBtn}>색 수정하기</button>
    </div>
  );
}

export default EditColor;
