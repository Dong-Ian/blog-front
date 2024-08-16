import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { tokenState } from "../../Utils/Atom";

import styles from "../Style/EditPost.module.css";

import EditPostFunction from "../Function/EditPostFunction";

import Title from "../../Posting/Component/Title";
import Content from "../../Posting/Component/Content";
import Tag from "../../Posting/Component/Tag";
import Catetory from "../../Posting/Component/Category";
import CategoryList from "../../Posting/Component/CategoryList";

import Header from "../../Utils/Component/Header";
import BackButton from "../../Utils/Component/BackButton";

function EditPostPage({ post, categoryList }) {
  const navigate = useNavigate();

  const token = useRecoilValue(tokenState);

  const postSeq = post.postSeq;
  const [title, setTitle] = useState(post.postTitle || "");
  const [content, setContent] = useState(post.postContents || "");
  const [category, setCategory] = useState(post.category || "");
  const [tags, setTags] = useState(post.tags);

  const isPinned = post.isPinned;

  async function EditPost() {
    if (window.confirm("글을 수정하시겠습니까?")) {
      const result = await EditPostFunction({
        postSeq: postSeq,
        token: token,
        postTitle: title,
        postContents: content,
        isPinned: isPinned,
        tags: tags,
        category: category,
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
        <div style={{ marginLeft: "30px" }}>
          <BackButton />
        </div>
        <Title title={title} setTitle={setTitle} />
        <Catetory category={category} setCategory={setCategory} />
        {categoryList.length !== 0 && (
          <div className={styles.categorylist}>
            <CategoryList
              categoryList={categoryList}
              setCategory={setCategory}
            />
          </div>
        )}
        <Tag tag={tags} setTag={setTags} />
        <Content content={content} setContent={setContent} />

        <div className={styles.button}>
          <button onClick={EditPost}>글 수정하기</button>
        </div>
      </div>
    </>
  );
}

export default EditPostPage;
