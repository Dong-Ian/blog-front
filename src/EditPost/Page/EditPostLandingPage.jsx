import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import LoadPostFunctioin from "../../Post/Function/LoadPostFunction";

import EditPostPage from "./EditPostPage";

function EditPostLandingPage() {
  const navigate = useNavigate();
  let { postSeq } = useParams();

  const [post, setPost] = useState(null);

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
    }
  }, [post]);

  if (post) {
    return <EditPostPage post={post} />;
  }
}

export default EditPostLandingPage;
