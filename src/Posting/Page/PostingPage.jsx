import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { isLoggedInState, tokenState } from "../../Utils/Atom";

import styles from "../Style/Posting.module.css";

import PostingFunction from "../Function/PostingFunction";
import JWTTestFunction from "../../Utils/Function/JWTTestFunction";
import LoadCategoryFunction from "../Function/LoadCategoryFunction";

import Title from "../Component/Title";
import Content from "../Component/Content";
import Catetory from "../Component/Category";
import Tag from "../Component/Tag";
import CategoryList from "../Component/CategoryList";
import Header from "../../Component/Header";
import BackButton from "../../Component/BackButton";

function PostingPage() {
  const navigate = useNavigate();

  const token = useRecoilValue(tokenState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const [postTitle, setPostTitle] = useState("");
  const [postContents, setPostContents] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");

  const [categoryList, setCategoryList] = useState([]);

  async function Posting() {
    const result = await PostingFunction({
      token: token,
      postTitle: postTitle,
      postContents: postContents,
      imageSeqs: [],
      tags: tags,
      category: category,
      isPinned: "0",
    });

    if (result.result) {
      alert("포스팅 성공");
      navigate(`/post/${result.postSeq}`);

      return;
    }

    alert("포스팅 실패");
    return;
  }

  async function JWT() {
    const result = await JWTTestFunction({ token });

    if (result.code === "01") return;

    setIsLoggedIn(false);
    alert("세션이 만료되었습니다. 다시 로그인 해주세요");

    navigate("/");

    return;
  }

  async function LoadCategory() {
    const result = await LoadCategoryFunction();

    if (result.result) {
      setCategoryList(result.categoryList || []);
      return;
    }

    alert("카테고리를 불러오는 중 오류가 발생했습니다.");
    return;
  }

  useEffect(() => {
    JWT();
    LoadCategory();
  }, []);

  if (categoryList) {
    return (
      <>
        <Header />
        <div className={styles.outer_post_box}>
          <div style={{ marginLeft: "30px" }}>
            <BackButton />
          </div>
          <Title title={postTitle} setTitle={setPostTitle} />

          <Catetory category={category} setCategory={setCategory} />
          <div className={styles.categorylist}>
            <CategoryList
              categoryList={categoryList}
              setCategory={setCategory}
            />
          </div>

          <Tag tag={tags} setTag={setTags} />
          <Content content={postContents} setContent={setPostContents} />
          <div className={styles.button}>
            <button onClick={Posting}>글 작성하기</button>
          </div>
        </div>
      </>
    );
  }
}

export default PostingPage;
