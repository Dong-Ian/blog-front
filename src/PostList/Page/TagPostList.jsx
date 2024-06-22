import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import LoadTagPostListFunction from "../Function/LoadTagPostListFunction";

import PostList from "../Component/PostList";

function TagPostListPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { tag } = location.state || {};

  const [postList, setPostList] = useState(null);

  async function LoadTagPostList() {
    const result = await LoadTagPostListFunction({
      tag: tag,
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
    LoadTagPostList();
  }, []);

  if (postList) {
    return (
      <div>
        <PostList postList={postList} />
      </div>
    );
  }
}

export default TagPostListPage;
