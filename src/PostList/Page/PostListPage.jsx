import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import styles from "../Style/postlist.module.css";

import LoadPostListFunction from "../Function/LoadPostListFunction";
import LoadAccountFunction from "../../Account/Function/LoadAccountFunction";

import PostList from "../Component/PostList";
import PaginationComponent from "../Component/PaginationComponent";
import AccountComponent from "../../Account/Component/AccountComponent";

import Header from "../../Utils/Component/Header";
import BackButton from "../../Utils/Component/BackButton";
import Footer from "../../Utils/Component/Footer";

/**
 * 게시글 목록 페이지 컴포넌트
 * 게시글 목록과 사용자 정보를 불러와 렌더링
 *
 * @returns {JSX.Element} 게시글 목록 페이지
 */
function PostListPage() {
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  // 상태 관리 변수들
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보
  const [pinnedPostList, setPinnedPostList] = useState(null); // 고정 게시글 목록
  const [unPinnedPostList, setUnPinnedPostList] = useState(null); // 비고정 게시글 목록
  const [totalCount, setTotalCount] = useState(null); // 전체 게시글 수
  const [activePage, setActivePage] = useState(1); // 현재 활성 페이지

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
   * 게시글 목록을 불러오는 함수
   * @param {Object} param - 페이지 번호 객체
   * @param {number} param.page - 현재 페이지 번호
   */
  async function LoadPostList({ page }) {
    const result = await LoadPostListFunction({ page, size: 5 }); // 페이지에 따라 게시글 목록 API 호출

    if (result.result) {
      setPinnedPostList(result.pinnedPostList || []); // 고정 게시글 목록 상태 업데이트
      setUnPinnedPostList(result.unpinnedPostList || []); // 비고정 게시글 목록 상태 업데이트
      setTotalCount(Number(result.postCount)); // 전체 게시글 수 상태 업데이트
      return;
    }

    alert("오류가 발생하였습니다."); // 오류 발생 시 알림
    navigate("/postlist");
    return;
  }

  /**
   * 페이지 변경 시 호출되는 함수
   * @param {number} e - 변경된 페이지 번호
   */
  function handlePageChange(e) {
    LoadPostList({ page: e }); // 새로운 페이지에 따라 게시글 목록 로드
    setActivePage(e); // 현재 페이지 상태 업데이트
    window.scrollTo(0, 0); // 페이지 맨 위로 스크롤 이동
  }

  // 컴포넌트가 처음 렌더링될 때 게시글 목록과 사용자 정보 불러옴
  useEffect(() => {
    LoadPostList({ page: 1 });
    LoadUserInfo();
  }, []);

  // 모든 데이터가 로드된 경우 렌더링
  if (userInfo && pinnedPostList && unPinnedPostList) {
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
          <p className={styles.box_title}>전체 게시글</p>
          {unPinnedPostList.length != 0 ? (
            <>
              <PostList postList={unPinnedPostList} />
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

export default PostListPage;
