import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../Style/postlist.module.css";

import LoadPinnedPostListFunction from "../Function/LoadPinnedPostListFunction";

import PostList from "../Component/PostList";
import Header from "../../Component/Header";
import PaginationComponent from "../Component/PaginationComponent";

function PinnedPostListPage() {
  const navigate = useNavigate();

  const [postList, setPostList] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [activePage, setActivePage] = useState(1);

  async function LoadCategoryPostList({ page }) {
    const result = await LoadPinnedPostListFunction({
      page: page,
      size: 5,
    });

    if (result.result) {
      setPostList(result.pinnedPostList);
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
  }, []);

  if (postList) {
    return (
      <div>
        <Header />
        <div className={styles.outer_post_box}>
          <p className={styles.box_title}>고정 게시글</p>
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

export default PinnedPostListPage;
