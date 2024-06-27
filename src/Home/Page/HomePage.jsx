import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../Style/home.module.css";

import LoadPinnedPostListFunction from "../../PostList/Function/LoadPinnedPostListFunction";
import LoadAccountFunction from "../../Account/Function/LoadAccountFunction";
import LoadPostListFunction from "../../PostList/Function/LoadPostListFunction";

import Header from "../../Component/Header";
import PostList from "../../PostList/Component/PostList";
import AccountComponent from "../../Account/Component/AccountComponent";
import Category from "../Component/Category";

function HomePage() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [postList, setPostList] = useState(null);
  const [pinnedPostList, setPinnedPostList] = useState(null);

  async function LoadUseInfo() {
    const result = await LoadAccountFunction();
    if (result.result) {
      setUserInfo(result.profileResult);

      return;
    }

    alert("사용자 정보를 불러오지 못했습니다.");
    return;
  }

  async function LoadPostList() {
    const result = await LoadPostListFunction({ page: 1, size: 5 });
    if (result.result) {
      setPostList(result.unpinnedPostList);

      return;
    }

    alert("전체글을 불러오지 못했습니다.");
    return;
  }

  async function LoadPinnedPostList() {
    const result = await LoadPinnedPostListFunction({ page: 1, size: 3 });
    if (result.result) {
      setPinnedPostList(result.pinnedPostList);

      return;
    }
    alert("고정글을 불러오지 못했습니다.");

    return;
  }

  useEffect(() => {
    LoadUseInfo();
    LoadPinnedPostList();
    LoadPostList();
  }, []);

  return (
    <>
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

              {pinnedPostList && <PostList postList={pinnedPostList} />}
            </div>
            <div className={styles.unpinnedbox}>
              <div className={styles.btn} onClick={() => navigate("/postlist")}>
                최신글 {">"}
              </div>
              {postList && <PostList postList={postList} />}
            </div>
          </div>
        </div>
        <div className={styles.undercategorybox} />
        <div className={styles.categorybox}>
          <Category />
        </div>
      </div>
    </>
  );
}

export default HomePage;
