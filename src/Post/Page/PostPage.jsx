import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useRecoilValue } from "recoil";
import { isLoggedInState, tokenState } from "../../Utils/Atom";

import styles from "../Style/post.module.css";

import LoadPostFunctioin from "../Function/LoadPostFunction";
import LoadAccountFunction from "../../Account/Function/LoadAccountFunction";

import Contents from "../Component/Contents";
import DeleteButton from "../Component/DeleteButton";
import UnPinButton from "../Component/UnPinButton";
import PinButton from "../Component/PinButton";
import Tag from "../Component/Tag";
import Header from "../../Component/Header";
import EditPostButton from "../Component/EditPostButton";
import Comment from "../Component/Comment";
import BackButton from "../../Component/BackButton";
import AccountComponent from "../../Account/Component/AccountComponent";
import HeaderTagList from "../Component/HeaderTagList";
import Title from "../Component/Title";
import Footer from "../../Utils/Component/Footer";

function DateRender({ reg, view }) {
  const date = new Date(reg);
  date.setHours(date.getHours() + 9);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const min = date.getMinutes();

  const paddedHour = String(hour).padStart(2, 0);
  const paddedMin = String(min).padStart(2, 0);

  return (
    <div className={styles.date}>
      <p>
        {year}년 {month}월 {day}일 {paddedHour}:{paddedMin}
        <span> | 조회수 {view}</span>
      </p>
    </div>
  );
}

function AdminButtonRender({
  isLoggedIn,
  token,
  postSeq,
  post,
  setChangePinned,
}) {
  return (
    <>
      {isLoggedIn && (
        <div className={styles.btn_box}>
          <DeleteButton token={token} postSeq={postSeq} />
          <EditPostButton postSeq={postSeq} />
          {post.isPinned === "1" ? (
            <UnPinButton
              token={token}
              postSeq={postSeq}
              setChangePinned={setChangePinned}
            />
          ) : (
            <PinButton
              token={token}
              postSeq={postSeq}
              setChangePinned={setChangePinned}
            />
          )}
        </div>
      )}
    </>
  );
}

function BottomBackButtonRender({ navigate }) {
  return (
    <div
      className={styles.bottom_back_button}
      onClick={() => {
        navigate(-1);
      }}
    >
      <button>목록으로</button>
    </div>
  );
}

function PostPage() {
  const { postSeq } = useParams();
  const navigate = useNavigate();

  const token = useRecoilValue(tokenState);
  const isLoggedIn = useRecoilValue(isLoggedInState);

  const [userInfo, setUserInfo] = useState(null);
  const [post, setPost] = useState(null);
  const [changePinned, setChangePinned] = useState(false);

  async function LoadUserInfo() {
    const result = await LoadAccountFunction();

    if (result.result) {
      setUserInfo(result.profileResult);

      return;
    }

    alert("사용자 정보를 불러오지 못했습니다.");
    return;
  }

  async function LoadPost() {
    const result = await LoadPostFunctioin({ postSeq });

    if (result.result) {
      setPost(result.postList);

      return;
    }

    alert("포스트를 불러오는 중 오류가 발생하였습니다.");
    navigate("/postlist");

    return;
  }

  useEffect(() => {
    LoadPost();
    LoadUserInfo();
  }, [changePinned]);

  if (post) {
    return (
      <>
        <Helmet title={post.postTitle} />
        <Header />
        <div>
          <HeaderTagList post={post} />
        </div>
        <div className={styles.outer_post_box}>
          <div className={styles.accountbox}>
            {userInfo && <AccountComponent userInfo={userInfo} />}
          </div>
          <div className={styles.post_box}>
            <div className={styles.back_button}>
              <BackButton />
            </div>
            {post.category !== "NULL" ? (
              <div
                className={styles.category}
                onClick={() =>
                  navigate(`/postlist/category/${post.category}`, {
                    state: { category: post.category },
                  })
                }
              >
                <p>{post.category}</p>
              </div>
            ) : (
              <div className={styles.category}></div>
            )}

            <Title title={post.postTitle} />
            <Tag tagList={post.tags} />
            <DateRender reg={post.regDate} view={post.viewed} />
            <AdminButtonRender
              isLoggedIn={isLoggedIn}
              token={token}
              postSeq={postSeq}
              post={post}
              setChangePinned={setChangePinned}
            />
            <hr className={styles.hr} />
            <Contents post={post} />
            <hr className={styles.hr} />
            <div className={styles.button_div}>
              <BottomBackButtonRender navigate={navigate} />
              <AdminButtonRender
                isLoggedIn={isLoggedIn}
                token={token}
                postSeq={postSeq}
                post={post}
                setChangePinned={setChangePinned}
              />
            </div>
          </div>

          <Comment post={post} />
          <div className={styles.comment} />
          <Footer />
        </div>
      </>
    );
  }
}

export default PostPage;
