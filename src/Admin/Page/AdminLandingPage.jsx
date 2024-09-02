import { useEffect, useState } from "react";

import LoadAccountFunction from "../../Account/Function/LoadAccountFunction";
import AdminPage from "./AdminPage";

/**
 * 관리자 랜딩 페이지 컴포넌트
 *
 * 이 컴포넌트는 관리자 페이지에 필요한 프로필 정보를 불러온 후,
 * 불러온 프로필 정보를 기반으로 `AdminPage` 컴포넌트를 렌더링
 *
 * @returns {JSX.Element | null} - 프로필 정보가 불러와지면 `AdminPage`를 렌더링, 그렇지 않으면 null
 */
function AdminLandingPage() {
  // 프로필 상태를 관리
  const [profile, setProfile] = useState(null);

  /**
   * 계정 정보를 불러오는 함수
   *
   * LoadAccountFunction을 호출하여 프로필 정보를 불러옴
   * 프로필 정보가 성공적으로 불러와지면 상태를 업데이트
   *
   * 실패할 경우 에러 메시지를 알림으로 표시
   */
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

  // 프로필 정보가 로드되었으면 `AdminPage`를 렌더링
  if (profile) {
    return <AdminPage profile={profile} />;
  }

  return null;
}

export default AdminLandingPage;
