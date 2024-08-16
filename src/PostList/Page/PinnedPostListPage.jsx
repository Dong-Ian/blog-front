import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import styles from "../Style/postlist.module.css";

import LoadPinnedPostListFunction from "../Function/LoadPinnedPostListFunction";
import LoadAccountFunction from "../../Account/Function/LoadAccountFunction";

import PostList from "../Component/PostList";
import Header from "../../Component/Header";
import PaginationComponent from "../Component/PaginationComponent";
import BackButton from "../../Component/BackButton";
import AccountComponent from "../../Account/Component/AccountComponent";
import Footer from "../../Utils/Component/Footer";

function PinnedPostListPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [postList, setPostList] = useState(null);
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

  async function LoadCategoryPostList({ page }) {
    const result = await LoadPinnedPostListFunction({
      page: page,
      size: 5,
    });

    if (result.result) {
      setPostList(result.pinnedPostList || []);
      setTotalCount(result.postCount);

      return;
    }

    alert("오류가 발생하였습니다.");
    navigate("/postlist");

    return;
  }

  function handlePageChange(e) {
    LoadPinnedPostListFunction({ page: e, size: 5 });
    setActivePage(e);
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    LoadCategoryPostList({ page: 1 });
    LoadUserInfo();
  }, []);

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
          {postList.length != 0 ? (
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
