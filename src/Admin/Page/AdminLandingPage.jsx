import { useEffect, useState } from "react";
import LoadAccountFunction from "../../Account/Function/LoadAccountFunction";
import AdminPage from "./AdminPage"; // AdminPage 컴포넌트 임포트

function AdminLandingPage() {
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
    if (!profile) {
      LoadAccount();
    }
  }, [profile]);

  if (profile) {
    return <AdminPage profile={profile} />;
  }

  return <div>Loading</div>;
}

export default AdminLandingPage;
