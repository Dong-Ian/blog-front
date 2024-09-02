import { useRecoilValue } from "recoil";
import { tokenState } from "../../Utils/Atom";

import styles from "../Style/admin.module.css";

import EditColorFunction from "../Function/EditColorFunction";

import SketchPicker from "react-color";

/**
 * 색상 편집 컴포넌트
 *
 * 사용자가 색상을 선택하고 수정할 수 있는 기능을 제공
 * 선택한 색상을 서버에 저장
 *
 * @param {Object} props - 컴포넌트에 전달되는 속성
 * @param {Object} props.state - 현재 색상 상태
 * @param {Function} props.setState - 색상 상태를 업데이트하는 함수
 * @param {Function} props.setColor - 색상 상태를 최종적으로 저장하는 함수
 * @returns {JSX.Element} - 색상 편집 UI
 */
function EditColor({ state, setState, setColor }) {
  // Recoil에서 토큰 값을 가져옴
  const token = useRecoilValue(tokenState);

  /**
   * 색상 변경 완료 핸들러
   *
   * 색상이 변경되면 색상 상태를 업데이트
   *
   * @param {Object} color - 선택된 색상 정보
   */
  function handleChangeComplete(color) {
    setState({ background: color.hex });
  }

  /**
   * 색상 수정 버튼 클릭 핸들러
   *
   * 색상 변경 요청을 서버에 보내고, 성공 시 색상 상태를 업데이트합니다.
   *
   * @param {Event} e - 클릭 이벤트
   */
  async function onClickEditBtn(e) {
    e.preventDefault();
    const result = await EditColorFunction({ token: token, color: state });

    if (result.result) {
      alert("색상이 변경되었습니다.");
      setColor(state); // 색상 상태를 최종적으로 저장합니다.

      return;
    }

    alert("오류가 발생했습니다.");

    return;
  }

  return (
    <div className={styles.change_color}>
      <div>
        <SketchPicker
          color={state.background} // 현재 색상 상태를 SketchPicker에 전달합니다.
          onChangeComplete={handleChangeComplete} // 색상이 변경될 때 호출되는 핸들러
        />
      </div>
      <div className={styles.change_button}>
        <button onClick={onClickEditBtn}>대표 색상 수정</button>
      </div>
    </div>
  );
}

export default EditColor;
