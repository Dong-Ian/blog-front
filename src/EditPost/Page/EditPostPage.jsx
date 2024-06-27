import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useRecoilValue } from "recoil";
import { tokenState } from "../../Utils/Atom";

import styles from "../Style/EditPost.module.css";

import Title from "../../Posting/Component/Title";
import Content from "../../Posting/Component/Content";
import Header from "../../Component/Header";
import EditPostFunction from "../Function/EditPostFunction";

function EditPostPage({ post }) {
  const navigate = useNavigate();

  const token = useRecoilValue(tokenState);

  const [title, setTitle] = useState(post.postTitle || "");
  const [content, setContent] = useState(post.postContents || "");
  const isPinned = post.isPinned;

  async function EditPost() {
    if (window.confirm("글을 수정하시겠습니까?")) {
      const result = await EditPostFunction({
        token: token,
        postTitle: title,
        postContents: content,
        isPinned: isPinned,
      });

      if (result.result) {
        alert("수정이 완료되었습니다.");
        navigate(`/post/${post.postSeq}`);

        return;
      }

      alert("수정이 완료되지 않았습니다.");

      return;
    }

    return;
  }

  return (
    <>
      <Header />
      <div className={styles.outer_post_box}>
        <Title title={title} setTitle={setTitle} />
        <Content content={content} setContent={setContent} />
        <div className={styles.button}>
          <button onClick={EditPost}>글 수정하기</button>
        </div>
      </div>
    </>
  );
}

export default EditPostPage;
