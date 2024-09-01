import { useRef } from "react";

import styles from "../Style/admin.module.css";

/**
 * 프로필 이미지를 업로드하고 삭제하는 컴포넌트
 *
 * @param {Object} props - 컴포넌트에 전달되는 속성
 * @param {string} props.profileImg - 현재 프로필 이미지 URL
 * @param {Function} props.setProfileImg - 프로필 이미지 상태를 업데이트하는 함수
 * @param {Function} props.setFormData - 폼 데이터를 업데이트하는 함수
 * @returns {JSX.Element} - 프로필 이미지 업로드 및 삭제 UI
 */
function EditProfileImg({ profileImg, setProfileImg, setFormData }) {
  const fileInputRef = useRef(null);

  /**
   * "사진 선택" 버튼 클릭 시 파일 선택 창을 열기 위한 핸들러
   */
  const handleEditButtonClick = () => {
    fileInputRef.current.click(); // 숨겨진 파일 입력 요소 클릭
  };

  /**
   * 파일 선택 시 호출되는 핸들러
   *
   * 선택된 파일을 FormData에 추가하고, 미리 보기 이미지를 설정
   *
   * @param {Event} e - 파일 입력 이벤트
   */
  const onchangeImageUpload = (e) => {
    const { files } = e.target;
    const uploadFile = files[0]; // 선택된 파일

    // 선택된 파일의 URL을 생성하여 미리 보기 이미지로 설정
    setProfileImg(URL.createObjectURL(uploadFile));

    // FormData 객체를 생성하고 파일을 추가
    const newFormData = new FormData();
    newFormData.append("file", uploadFile);

    // 부모 컴포넌트에 FormData를 전달
    setFormData(newFormData);
  };

  /**
   * "사진 삭제" 버튼 클릭 시 호출되는 핸들러
   *
   * 현재 프로필 이미지를 삭제하고, FormData를 초기화
   *
   * @param {Event} event - 클릭 이벤트
   */
  function handleDeleteProfile(event) {
    event.preventDefault(); // 기본 클릭 동작 방지
    setFormData(new FormData()); // FormData 초기화
    setProfileImg(null); // 프로필 이미지 초기화
  }

  return (
    <div className={styles.change_img}>
      <div className={styles.img}>
        {profileImg != null ? (
          <img alt="프로필 이미지 미리 보기" src={profileImg} />
        ) : null}
      </div>

      <div className={styles.button_div}>
        <button onClick={handleEditButtonClick}>사진 선택</button>

        <button onClick={handleDeleteProfile}>사진 삭제</button>
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

export default EditProfileImg;
