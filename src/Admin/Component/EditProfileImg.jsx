import { useRef } from "react";

import styles from "../Style/admin.module.css";

function EditProfileImg({ profileImg, setProfileImg, setFormData }) {
  const fileInputRef = useRef(null);

  const handleEditButtonClick = () => {
    console.log("click");
    fileInputRef.current.click();
  };

  const onchangeImageUpload = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];

    setProfileImg(URL.createObjectURL(uploadFile));

    const newFormData = new FormData();
    newFormData.append("file", uploadFile);

    setFormData(newFormData);
  };

  function handleDeleteProfile(event) {
    event.preventDefault();
    setFormData(new FormData());
    setProfileImg(null);
  }

  return (
    <div className={styles.change_img}>
      <p>프로필 이미지 변경</p>
      <div className={styles.img}>
        {profileImg != null ? <img alt="" src={profileImg} /> : null}
      </div>

      <div className={styles.button_div}>
        <div className={styles.change_button}>
          <button onClick={handleEditButtonClick}>사진 선택</button>
        </div>
        <div className={styles.change_button}>
          <button onClick={handleDeleteProfile}>삭제</button>
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

export default EditProfileImg;
