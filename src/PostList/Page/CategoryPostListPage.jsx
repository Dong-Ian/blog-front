import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "../Style/postlist.module.css";

import LoadCategoryPostListFunction from "../Function/LoadCategoryPostListFunction";
import LoadAccountFunction from "../../Account/Function/LoadAccountFunction";

import PostList from "../Component/PostList";
import Header from "../../Component/Header";
import PaginationComponent from "../Component/PaginationComponent";
import BackButton from "../../Component/BackButton";
import AccountComponent from "../../Account/Component/AccountComponent";

function CategoryPostListPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { category } = location.state || {};

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
    const result = await LoadCategoryPostListFunction({
      category: category,
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
    LoadCategoryPostList({ page: e });
    setActivePage(e);
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    LoadCategoryPostList({ page: 1 });
    LoadUserInfo();
  }, []);

  if (postList) {
    return (
      <div>
        <Header />
        <div className={styles.outer_post_box}>
          <div style={{ marginLeft: "30px" }}>
            <BackButton />
          </div>
          <div className={styles.accountbox}>
            {userInfo && <AccountComponent userInfo={userInfo} />}
          </div>
          <p className={styles.box_title}>{category}</p>
          <PostList postList={postList} />
          <PaginationComponent
            totalCount={totalCount}
            onChange={handlePageChange}
            itemsCountPerPage={5}
            activePage={activePage}
          />
        </div>
      </div>
    );
  }
}

export default CategoryPostListPage;
