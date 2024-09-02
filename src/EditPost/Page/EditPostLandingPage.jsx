import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import LoadPostFunction from "../../Post/Function/LoadPostFunction";

import EditPostPage from "./EditPostPage";
import LoadCategoryFunction from "../../Posting/Function/LoadCategoryFunction";

/**
 * 게시물 수정 페이지 로딩 컴포넌트
 *
 * 게시물과 카테고리 목록을 불러오고, 성공적으로 로딩되면 수정 페이지를 렌더링함
 *
 * @returns {JSX.Element | null} 수정 페이지 컴포넌트 또는 null
 */
function EditPostLandingPage() {
  const navigate = useNavigate();
  let { postSeq } = useParams();

  const [post, setPost] = useState(null);
  const [categoryList, setCategoryList] = useState(null);

  /**
   * 카테고리 목록을 불러오는 함수
   *
   * 카테고리 목록을 불러오고, 성공적으로 로딩되면 상태를 업데이트함
   * 실패 시 오류 메시지를 알리고, 게시물 목록 페이지로 이동함
   */
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

  /**
   * 게시물을 불러오는 함수
   *
   * 게시물을 불러오고, 성공적으로 로딩되면 상태를 업데이트함
   * 실패 시 오류 메시지를 알리고, 게시물 목록 페이지로 이동함
   */
  async function LoadPost() {
    const result = await LoadPostFunction({ postSeq: postSeq });

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

  return null;
}

export default EditPostLandingPage;
