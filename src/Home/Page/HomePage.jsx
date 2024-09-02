import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import styles from "../Style/home.module.css";

import LoadPinnedPostListFunction from "../../PostList/Function/LoadPinnedPostListFunction";
import LoadAccountFunction from "../../Account/Function/LoadAccountFunction";
import LoadPostListFunction from "../../PostList/Function/LoadPostListFunction";

import PostList from "../../PostList/Component/PostList";
import AccountComponent from "../../Account/Component/AccountComponent";
import Category from "../Component/Category";

import Header from "../../Utils/Component/Header";
import Footer from "../../Utils/Component/Footer";

/**
 * 홈페이지 컴포넌트
 * 사용자 정보, 고정 글 목록, 일반 글 목록을 불러와서 표시
 */
function HomePage() {
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  // 사용자 정보와 글 목록을 관리하는 상태 변수
  const [userInfo, setUserInfo] = useState(null);
  const [postList, setPostList] = useState(null);
  const [pinnedPostList, setPinnedPostList] = useState(null);

  /**
   * 사용자 정보를 불러오는 함수
   */
  async function LoadUseInfo() {
    const result = await LoadAccountFunction(); // 사용자 정보 불러오기
    if (result.result) {
      setUserInfo(result.profileResult); // 사용자 정보 상태 업데이트

      return;
    }

    alert("사용자 정보를 불러오지 못했습니다."); // 오류 알림
    return;
  }

  /**
   * 전체 게시글 목록을 불러오는 함수
   */
  async function LoadPostList() {
    const result = await LoadPostListFunction({ page: 1, size: 5 }); // 게시글 목록 불러오기
    if (result.result) {
      setPostList(result.unpinnedPostList || []); // 게시글 목록 상태 업데이트

      return;
    }

    alert("전체글을 불러오지 못했습니다."); // 오류 알림
    return;
  }

  /**
   * 고정 게시글 목록을 불러오는 함수
   */
  async function LoadPinnedPostList() {
    const result = await LoadPinnedPostListFunction({ page: 1, size: 3 }); // 고정 게시글 목록 불러오기
    if (result.result) {
      setPinnedPostList(result.pinnedPostList || []); // 고정 게시글 목록 상태 업데이트

      return;
    }
    alert("고정글을 불러오지 못했습니다."); // 오류 알림

    return;
  }

  // 컴포넌트가 처음 렌더링될 때 사용자 정보와 게시글 목록을 불러옴
  useEffect(() => {
    LoadUseInfo();
    LoadPinnedPostList();
    LoadPostList();
  }, []);

  // 사용자 정보와 게시글 목록이 모두 로드된 경우 렌더링
  if (userInfo && postList && pinnedPostList) {
    return (
      <>
        <Helmet title={userInfo.title} />
        <Header />
        <div className={styles.container}>
          <div className={styles.accountbox}>
            {userInfo && <AccountComponent userInfo={userInfo} />}
          </div>
          <div className={styles.box}>
            <div className={styles.outer_post_box}>
              <div className={styles.pinnedbox}>
                <div
                  className={styles.btn}
                  onClick={() => navigate("/postlist/pinned")}
                >
                  고정글 {">"}
                </div>

                {pinnedPostList.length != 0 ? (
                  <PostList postList={pinnedPostList} />
                ) : (
                  <div className={styles.nullpost}>
                    등록된 게시글이 없습니다
                  </div>
                )}
              </div>
              <div className={styles.unpinnedbox}>
                <div
                  className={styles.btn}
                  onClick={() => navigate("/postlist")}
                >
                  최신글 {">"}
                </div>
                {postList.length != 0 ? (
                  <PostList postList={postList} />
                ) : (
                  <div className={styles.nullpost}>
                    등록된 게시글이 없습니다
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.categorybox}>
            <Category />
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default HomePage;
