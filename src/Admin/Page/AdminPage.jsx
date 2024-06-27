import { useState } from "react";
import { useLocation } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { ColorState, tokenState } from "../../Utils/Atom";

import styles from "../Style/admin.module.css";

import EditProfileImgFunction from "../Function/EditProfileImgFunction";
import EditBackgroundImgFunction from "../Function/EditBackgroundImgFunction";
import EditAccountFunction from "../Function/EditAccountFunction";

import EditProfileImg from "../Component/EditProfileImg";
import EditBackgroundImg from "../Component/EditBackgroundImg";
import EditElement from "../Component/EditTitle";
import EditColor from "../Component/EditColor";

function AdminPage({ profile }) {
  const location = useLocation();

  const token = useRecoilValue(tokenState);

  const [formData, setFormData] = useState(new FormData());
  const [formData2, setFormData2] = useState(new FormData());

  const [profileImg, setProfileImg] = useState();
  const [backgroundImg, setBackgroundImg] = useState();

  const [color, setColor] = useRecoilState(ColorState);
  const [state, setState] = useState(color);

  const [name, setName] = useState(profile.userName || "");
  const [memo, setMemo] = useState(profile.memo || "");
  const [githubUrl, setGithubUrl] = useState(profile.githubUrl || "");
  const [instagram, setInstagram] = useState(profile.instagram || "");
  const [personalUrl, setPersonalUrl] = useState(profile.personalUrl || "");
  const [title, setTitle] = useState(profile.title || "");

  async function profileImgFunction() {
    const result = await EditProfileImgFunction({
      token: token,
      formData: formData,
    });

    if (result.result) {
      alert("프로필 사진 변경이 완료되었습니다.");
      return;
    }

    alert("프로필 사진을 변경하지 못했습니다.");
    return;
  }

  async function backgroundImgFunction() {
    const result = await EditBackgroundImgFunction({
      token: token,
      formData: formData2,
    });

    if (result.result) {
      alert("배경 사진 변경이 완료되었습니다.");
      return;
    }

    alert("베경 사진을 변경하지 못했습니다.");
    return;
  }

  async function EditProfile() {
    const result = await EditAccountFunction({
      token: token,
      name: name,
      color: state,
      title: title,
      memo: memo,
      instagram: instagram,
      githubUrl: githubUrl,
      personalUrl: personalUrl,
    });

    if (result.result) {
      setColor({ background: state });
      alert("성공적으로 프로필이 수정되었습니다.");

      return;
    }

    alert("서버 오류");

    return;
  }

  if (profile) {
    return (
      <div>
        <p>admin page</p>
        <p>edit profile img</p>
        <EditProfileImg
          profileImg={profileImg}
          setProfileImg={setProfileImg}
          setFormData={setFormData}
        />
        <button onClick={profileImgFunction}>프로필 사진 변경 확정</button>

        <p>edit background img</p>
        <EditBackgroundImg
          backgroundImg={backgroundImg}
          setBackgroundImg={setBackgroundImg}
          setFormData={setFormData2}
        />
        <button onClick={backgroundImgFunction}>배경 사진 변경 확정</button>

        <EditElement
          placeholder={profile.userName}
          text="edit name"
          getter={name}
          setter={setName}
        />
        <EditElement
          placeholder={profile.title}
          text="edit title"
          getter={title}
          setter={setTitle}
        />
        <EditElement
          placeholder={profile.githubUrl}
          text="edit githup"
          getter={githubUrl}
          setter={setGithubUrl}
        />
        <EditElement
          placeholder={profile.instagram}
          text="edit instagram"
          getter={instagram}
          setter={setInstagram}
        />
        <EditElement
          placeholder={profile.memo}
          text="edit meno"
          getter={memo}
          setter={setMemo}
        />
        <EditElement
          placeholder={profile.personalUrl}
          text="edit personal url"
          getter={personalUrl}
          setter={setPersonalUrl}
        />
        <button onClick={EditProfile}>프로필 변경하기</button>

        <EditColor
          state={state}
          color={color}
          setState={setState}
          setColor={setColor}
        />
      </div>
    );
  }
}

export default AdminPage;
