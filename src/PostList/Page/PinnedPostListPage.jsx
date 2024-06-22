import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PostList from "../Component/PostList";

import LoadPinnedPostListFunction from "../Function/LoadPinnedPostListFunction";

function PinnedPostListPage() {
  const navigate = useNavigate();

  const [postList, setPostList] = useState(null);

  async function LoadCategoryPostList() {
    const result = await LoadPinnedPostListFunction({
      page: 1,
      size: 10,
    });

    if (result.result) {
      setPostList(result.pinnedPostList);
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

export default PinnedPostListPage;
