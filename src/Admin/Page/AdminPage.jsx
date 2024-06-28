import { useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { ColorState, tokenState } from "../../Utils/Atom";

import styles from "../Style/admin.module.css";

import EditProfileImgFunction from "../Function/EditProfileImgFunction";
import EditBackgroundImgFunction from "../Function/EditBackgroundImgFunction";
import EditAccountFunction from "../Function/EditAccountFunction";

import EditProfileImg from "../Component/EditProfileImg";
import EditBackgroundImg from "../Component/EditBackgroundImg";
import EditElement from "../Component/EditElement";
import EditColor from "../Component/EditColor";
import Header from "../../Component/Header";
import AdminHeader from "../../Component/AdminHeader";

function AdminPage({ profile }) {
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
      <>
        <AdminHeader state={state} />
        <div className={styles.outer_post_box}>
          <p className={styles.main_title}>관리자 페이지</p>
          <hr />
          <p className={styles.title}>프로필 이미지 변경</p>
          <EditProfileImg
            profileImg={profileImg}
            setProfileImg={setProfileImg}
            setFormData={setFormData}
          />
          <div className={styles.change_button}>
            <button onClick={profileImgFunction}>프로필 사진 변경</button>
          </div>

          <hr />
          <p className={styles.title}>배경 이미지 변경</p>
          <EditBackgroundImg
            backgroundImg={backgroundImg}
            setBackgroundImg={setBackgroundImg}
            setFormData={setFormData2}
          />
          <div className={styles.change_button}>
            <button onClick={backgroundImgFunction}>배경 사진 변경</button>
          </div>
          <hr />
          <p className={styles.title}>회원 정보 변경</p>
          <EditElement
            placeholder={profile.userName}
            text="이름"
            getter={name}
            setter={setName}
          />
          <EditElement
            placeholder={profile.title}
            text="타이틀"
            getter={title}
            setter={setTitle}
          />
          <EditElement
            placeholder={profile.githubUrl}
            text="GitHub"
            getter={githubUrl}
            setter={setGithubUrl}
          />
          <EditElement
            placeholder={profile.instagram}
            text="Instagram"
            getter={instagram}
            setter={setInstagram}
          />
          <EditElement
            placeholder={profile.memo}
            text="메모"
            getter={memo}
            setter={setMemo}
          />
          <EditElement
            placeholder={profile.personalUrl}
            text="URL"
            getter={personalUrl}
            setter={setPersonalUrl}
          />
          <div className={styles.change_button}>
            <button onClick={EditProfile}>프로필 변경하기</button>
          </div>
          <hr />
          <p className={styles.title}>대표 색상 변경</p>
          <EditColor
            state={state}
            color={color}
            setState={setState}
            setColor={setColor}
          />
        </div>
      </>
    );
  }
}

export default AdminPage;
