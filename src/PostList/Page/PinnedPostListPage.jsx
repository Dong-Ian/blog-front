import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import styles from "../Style/postlist.module.css";

import LoadPinnedPostListFunction from "../Function/LoadPinnedPostListFunction";
import LoadAccountFunction from "../../Account/Function/LoadAccountFunction";
import PostList from "../Component/PostList";
import PaginationComponent from "../Component/PaginationComponent";
import AccountComponent from "../../Account/Component/AccountComponent";

import Header from "../../Utils/Component/Header";
import BackButton from "../../Utils/Component/BackButton";
import Footer from "../../Utils/Component/Footer";

/**
 * 고정 게시글 목록 페이지 컴포넌트
 * 고정된 게시글 목록과 사용자 정보를 불러와 렌더링
 *
 * @returns {JSX.Element} 고정 게시글 목록 페이지
 */
function PinnedPostListPage() {
  const navigate = useNavigate(); // 페이지 이동을 위한 hook
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 상태
  const [postList, setPostList] = useState(null); // 고정 게시글 목록 상태
  const [totalCount, setTotalCount] = useState(null); // 전체 게시글 수 상태
  const [activePage, setActivePage] = useState(1); // 현재 활성 페이지 상태

  /**
   * 사용자 정보를 불러오는 함수
   */
  async function LoadUserInfo() {
    const result = await LoadAccountFunction();

    if (result.result) {
      setUserInfo(result.profileResult); // 사용자 정보 상태 업데이트
      return;
    }

    alert("사용자 정보를 불러오지 못했습니다."); // 오류 발생 시 알림
    return;
  }

  /**
   * 고정 게시글 목록을 불러오는 함수
   * @param {Object} param - 페이지 번호 객체
   * @param {number} param.page - 현재 페이지 번호
   */
  async function LoadCategoryPostList({ page }) {
    const result = await LoadPinnedPostListFunction({
      page: page,
      size: 5,
    });

    if (result.result) {
      setPostList(result.pinnedPostList || []); // 고정 게시글 목록 상태 업데이트
      setTotalCount(result.postCount); // 전체 게시글 수 상태 업데이트
      return;
    }

    alert("오류가 발생하였습니다."); // 오류 발생 시 알림
    navigate("/postlist"); // 오류 발생 시 게시글 목록 페이지로 이동
    return;
  }

  /**
   * 페이지 변경 시 호출되는 함수
   * @param {number} e - 변경된 페이지 번호
   */
  function handlePageChange(e) {
    LoadCategoryPostList({ page: e }); // 새로운 페이지에 따라 고정 게시글 목록 로드
    setActivePage(e); // 현재 페이지 상태 업데이트
    window.scrollTo(0, 0); // 페이지 맨 위로 스크롤 이동
  }

  // 컴포넌트가 처음 렌더링될 때 고정 게시글 목록과 사용자 정보 불러옴
  useEffect(() => {
    LoadCategoryPostList({ page: 1 });
    LoadUserInfo();
  }, []);

  // 모든 데이터가 로드된 경우 렌더링
  if (userInfo && postList) {
    return (
      <div>
        <Helmet title={userInfo.title} />
        <Header />
        <div className={styles.outer_post_box}>
          <div style={{ marginLeft: "30px" }}>
            <BackButton />
          </div>
          <div className={styles.accountbox}>
            {userInfo && <AccountComponent userInfo={userInfo} />}
          </div>
          <p className={styles.box_title}>고정 게시글</p>
          {postList.length !== 0 ? (
            <>
              <PostList postList={postList} />
              <PaginationComponent
                totalCount={totalCount}
                onChange={handlePageChange}
                itemsCountPerPage={5}
                activePage={activePage}
              />
            </>
          ) : (
            <div className={styles.nullpost}>등록된 게시글이 없습니다</div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default PinnedPostListPage;
