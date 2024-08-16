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

function PostListPage() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [pinnedPostList, setPinnedPostList] = useState(null);
  const [unPinnedPostList, setUnPinnedPostList] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [activePage, setActivePage] = useState(1);

  async function LoadUserInfo() {
    const result = await LoadAccountFunction();

    if (result.result) {
      setUserInfo(result.profileResult);

      return;
    }

    alert("사용자 정보를 불러오지 못했습니다.");
    return;
  }

  async function LoadPostList({ page }) {
    const result = await LoadPostListFunction({ page, size: 5 });

    if (result.result) {
      setPinnedPostList(result.pinnedPostList || []);
      setUnPinnedPostList(result.unpinnedPostList || []);
      setTotalCount(Number(result.postCount));

      return;
    }

    alert("오류가 발생하였습니다.");
    navigate("/postlist");
    return;
  }

  function handlePageChange(e) {
    LoadPostList({ page: e });
    setActivePage(e);
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    LoadPostList({ page: 1 });
    LoadUserInfo();
  }, []);

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
