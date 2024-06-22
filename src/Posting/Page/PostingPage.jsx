import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { isLoggedInState, tokenState } from "../../Utils/Atom";

import PostingFunction from "../Function/PostingFunction";
import JWTTestFunction from "../../Utils/Function/JWTTestFunction";

import Title from "../Component/Title";
import Content from "../Component/Content";
import Catetory from "../Component/Category";
import Tag from "../Component/Tag";

function PostingPage() {
  const navigate = useNavigate();

  const token = useRecoilValue(tokenState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const [postTitle, setPostTitle] = useState("");
  const [postContents, setPostContents] = useState("");
  // const [imageSeqs, setImageSeqs] = useState([]);
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");

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
      navigate("/postlist");

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

  useEffect(() => {
    JWT();
  }, []);

  return (
    <div>
      <p>posting page</p>
      <Title title={postTitle} setTitle={setPostTitle} />
      <Catetory category={category} setCategory={setCategory} />
      <Tag tag={tags} setTag={setTags} />
      <Content content={postContents} setContent={setPostContents} />

      <button onClick={Posting}>posting</button>
    </div>
  );
}

export default PostingPage;
