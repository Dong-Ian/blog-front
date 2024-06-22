import { useRef } from "react";

function EditProfileImg({ profileImg, setProfileImg, setFormData }) {
  const fileInputRef = useRef(null);

  const handleEditButtonClick = () => {
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
    <div>
      <div>
        {profileImg != null ? (
          <img alt="" src={profileImg} style={{ width: 100, height: 100 }} />
        ) : null}
      </div>

      <button onClick={handleEditButtonClick}>사진 선택</button>

      <button onClick={handleDeleteProfile}>삭제</button>

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
