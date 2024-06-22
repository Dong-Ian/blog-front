import { useEffect, useState } from "react";

import LoadAccountFunction from "../Function/LoadAccountFunction";

function AccountPage() {
  const [profile, setProfile] = useState(null);

  async function LoadAccount() {
    const result = await LoadAccountFunction();

    if (result.result) {
      setProfile(result.profileResult);
      return;
    }

    alert("프로필을 불러오는 중 오류가 발생했습니다.");
    return;
  }

  useEffect(() => {
    LoadAccount();
  }, []);

  if (profile) {
    return (
      <div>
        <p>account page</p>
        <p>color: {profile.color}</p>
        <p>githubUrl: {profile.githubUrl}</p>
        <p>instagram: {profile.instagram}</p>
        {profile.images.backgroundImage && (
          <img
            alt=""
            src={profile.images.backgroundImage}
            style={{ height: 100, width: 100 }}
          />
        )}
        {profile.images.profileImage && (
          <img
            alt=""
            src={profile.images.profileImage}
            style={{ height: 100, width: 100 }}
          />
        )}
        <p>memo : {profile.memo}</p>
        <p>personalUrl: {profile.personalUrl}</p>
        <p>title: {profile.title}</p>
        <p>userEmail: {profile.userEmail}</p>
        <p>userName: {profile.userName}</p>
        <p></p>
      </div>
    );
  }
}

export default AccountPage;
