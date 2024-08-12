import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import LoadPostFunctioin from "../../Post/Function/LoadPostFunction";

import EditPostPage from "./EditPostPage";
import LoadCategoryFunction from "../../Posting/Function/LoadCategoryFunction";

function EditPostLandingPage() {
  const navigate = useNavigate();
  let { postSeq } = useParams();

  const [post, setPost] = useState(null);
  const [categoryList, setCategoryList] = useState(null);

  async function LoadCategoryList() {
    const result = await LoadCategoryFunction();

    if (result.result) {
      setCategoryList(result.categoryList);

      return;
    }

    alert("카테고리를 불러오지 못했습니다.");
    navigate(`/postlist/${postSeq}`);
    return;
  }

  async function LoadPost() {
    const result = await LoadPostFunctioin({ postSeq: postSeq });

    if (result.result) {
      setPost(result.postList);

      return;
    }

    alert("게시글을 불러오던 중 오류가 발생했습니다.");
    navigate(`/postlist/${postSeq}`);

    return;
  }

  useEffect(() => {
    if (!post) {
      LoadPost();
      LoadCategoryList();
    }
  }, [post]);

  if (post) {
    return <EditPostPage post={post} categoryList={categoryList} />;
  }
}

export default EditPostLandingPage;
