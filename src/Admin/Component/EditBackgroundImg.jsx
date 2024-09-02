import { useRef } from "react";

import styles from "../Style/admin.module.css";

/**
 * 배경 이미지 수정 컴포넌트
 *
 * 사용자가 배경 이미지를 선택하고 미리 보기, 삭제할 수 있는 기능을 제공
 *
 * @param {Object} props - 컴포넌트에 전달되는 속성
 * @param {string | null} props.backgroundImg - 현재 배경 이미지 URL
 * @param {Function} props.setBackgroundImg - 배경 이미지 URL을 업데이트하는 함수
 * @param {Function} props.setFormData - `FormData` 객체를 업데이트하는 함수
 * @returns {JSX.Element} - 배경 이미지 수정 UI
 */
function EditBackgroundImg({ backgroundImg, setBackgroundImg, setFormData }) {
  // 파일 입력 참조를 위한 useRef 훅
  const fileInputRef = useRef(null);

  /**
   * 사진 선택 버튼 클릭 핸들러
   *
   */
  const handleEditButtonClick = () => {
    fileInputRef.current.click();
  };

  /**
   * 이미지 업로드 핸들러
   *
   * 파일 선택 후, 선택한 파일을 미리 보고 `FormData` 객체를 업데이트합니다.
   *
   * @param {Event} e - 파일 입력 요소의 change 이벤트
   */
  const onchangeImageUpload = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];

    // 선택한 이미지 파일의 URL을 생성하여 배경 이미지로 설정합니다.
    setBackgroundImg(URL.createObjectURL(uploadFile));

    // FormData 객체를 생성하고 선택한 파일을 추가합니다.
    const newFormData = new FormData();
    newFormData.append("file", uploadFile);

    // FormData 객체를 상태에 설정합니다.
    setFormData(newFormData);
  };

  /**
   * 배경 이미지 삭제 핸들러
   *
   * 배경 이미지를 삭제하고, `FormData` 객체를 초기화합니다.
   *
   * @param {Event} event - 클릭 이벤트
   */
  function handleDeleteBackground(event) {
    event.preventDefault();
    setFormData(new FormData()); // FormData 초기화
    setBackgroundImg(null); // 배경 이미지 URL 초기화
  }

  return (
    <div className={styles.change_img}>
      <div className={styles.img}>
        {backgroundImg != null ? (
          <img src={backgroundImg} alt="" style={{ width: 100, height: 100 }} />
        ) : null}
      </div>

      <div className={styles.button_div}>
        <div className={styles.change_button}>
          <button onClick={handleEditButtonClick}>사진 선택</button>
        </div>
        <div className={styles.change_button}>
          <button onClick={handleDeleteBackground}>삭제</button>
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={onchangeImageUpload}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default EditBackgroundImg;
