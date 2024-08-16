import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import styles from "../Style/postlist.module.css";

import LoadTagPostListFunction from "../Function/LoadTagPostListFunction";
import LoadAccountFunction from "../../Account/Function/LoadAccountFunction";

import PostList from "../Component/PostList";
import PaginationComponent from "../Component/PaginationComponent";
import AccountComponent from "../../Account/Component/AccountComponent";

import Header from "../../Utils/Component/Header";
import BackButton from "../../Utils/Component/BackButton";
import Footer from "../../Utils/Component/Footer";

function TagPostListPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { tag } = location.state || {};

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

  async function LoadTagPostList({ page }) {
    const result = await LoadTagPostListFunction({
      tag: tag,
      page: page,
      size: 5,
    });

    if (result.result) {
      setPostList(result.postList || []);
      setTotalCount(result.postCount);
      return;
    }

    alert("오류가 발생하였습니다.");
    navigate("/postlist");

    return;
  }

  function handlePageChange(e) {
    LoadTagPostList({ page: e });
    setActivePage(e);
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    LoadTagPostList({ page: 1 });
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
          <p className={styles.box_title}>{tag}</p>
          <PostList postList={postList} />
          <PaginationComponent
            totalCount={totalCount}
            onChange={handlePageChange}
            itemsCountPerPage={5}
            activePage={activePage}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default TagPostListPage;
