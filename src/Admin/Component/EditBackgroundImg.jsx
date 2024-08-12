import { useRef } from "react";

import styles from "../Style/admin.module.css";

function EditBackgroundImg({ backgroundImg, setBackgroundImg, setFormData }) {
  const fileInputRef = useRef(null);

  const handleEditButtonClick = () => {
    fileInputRef.current.click();
  };

  const onchangeImageUpload = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];

    setBackgroundImg(URL.createObjectURL(uploadFile));

    const newFormData = new FormData();
    newFormData.append("file", uploadFile);

    setFormData(newFormData);
  };

  function handleDeleteBackground(event) {
    event.preventDefault();
    setFormData(new FormData());
    setBackgroundImg(null);
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
