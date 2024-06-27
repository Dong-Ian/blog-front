import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "../Style/postlist.module.css";

import LoadCategoryPostListFunction from "../Function/LoadCategoryPostListFunction";

import PostList from "../Component/PostList";
import Header from "../../Component/Header";
import PaginationComponent from "../Component/PaginationComponent";

function CategoryPostListPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { category } = location.state || {};

  const [postList, setPostList] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [activePage, setActivePage] = useState(1);

  async function LoadCategoryPostList({ page }) {
    const result = await LoadCategoryPostListFunction({
      category: category,
      page: page,
      size: 5,
    });

    if (result.result) {
      setPostList(result.postList);
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
  }

  useEffect(() => {
    LoadCategoryPostList({ page: 1 });
  }, []);

  if (postList) {
    return (
      <div>
        <Header />
        <div className={styles.outer_post_box}>
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
