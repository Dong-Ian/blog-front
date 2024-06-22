import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import LoadCategoryPostListFunction from "../Function/LoadCategoryPostListFunction";

import PostList from "../Component/PostList";

function CategoryPostListPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { category } = location.state || {};

  const [postList, setPostList] = useState(null);

  async function LoadCategoryPostList() {
    const result = await LoadCategoryPostListFunction({
      category: category,
      page: 1,
      size: 10,
    });

    if (result.result) {
      setPostList(result.postList);
      return;
    }

    alert("오류가 발생하였습니다.");
    navigate("/postlist");

    return;
  }

  useEffect(() => {
    LoadCategoryPostList();
  }, []);

  if (postList) {
    return (
      <div>
        <PostList postList={postList} />
      </div>
    );
  }
}

export default CategoryPostListPage;
