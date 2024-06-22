import { useRef } from "react";

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
    <div>
      <div>
        {backgroundImg != null ? (
          <img src={backgroundImg} alt="" style={{ width: 100, height: 100 }} />
        ) : null}
      </div>

      <button onClick={handleEditButtonClick}>사진 선택</button>

      <button onClick={handleDeleteBackground}>삭제</button>

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
