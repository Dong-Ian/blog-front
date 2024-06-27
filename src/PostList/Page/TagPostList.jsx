import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "../Style/postlist.module.css";

import LoadTagPostListFunction from "../Function/LoadTagPostListFunction";

import PostList from "../Component/PostList";
import Header from "../../Component/Header";
import PaginationComponent from "../Component/PaginationComponent";

function TagPostListPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { tag } = location.state || {};

  const [postList, setPostList] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [activePage, setActivePage] = useState(1);

  async function LoadTagPostList({ page }) {
    const result = await LoadTagPostListFunction({
      tag: tag,
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
    LoadTagPostList({ page: e });
    setActivePage(e);
  }

  useEffect(() => {
    LoadTagPostList({ page: 1 });
  }, []);

  if (postList) {
    return (
      <div>
        <Header />
        <div className={styles.outer_post_box}>
          <p className={styles.box_title}>{tag}</p>
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

export default TagPostListPage;
