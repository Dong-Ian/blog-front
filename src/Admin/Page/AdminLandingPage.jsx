import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoadAccountFunction from "../../Account/Function/LoadAccountFunction";

function AdminLandingPage() {
  const navigate = useNavigate();
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

    if (profile) {
      navigate("/admin/edit", { state: { profile: profile } });
    }
  }, [profile]);

  return <div>Loading</div>;
}

export default AdminLandingPage;
