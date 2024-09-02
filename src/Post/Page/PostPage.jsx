import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useRecoilValue } from "recoil";
import { isLoggedInState, tokenState } from "../../Utils/Atom";

import styles from "../Style/post.module.css";

import LoadPostFunctioin from "../Function/LoadPostFunction";
import LoadAccountFunction from "../../Account/Function/LoadAccountFunction";

import AccountComponent from "../../Account/Component/AccountComponent";

import DeleteButton from "../Component/DeleteButton";
import UnPinButton from "../Component/UnPinButton";
import PinButton from "../Component/PinButton";
import EditPostButton from "../Component/EditPostButton";

import Title from "../Component/Title";
import Contents from "../Component/Contents";
import Tag from "../Component/Tag";
import Comment from "../Component/Comment";
import HeaderTagList from "../Component/HeaderTagList";

import Header from "../../Utils/Component/Header";
import BackButton from "../../Utils/Component/BackButton";
import Footer from "../../Utils/Component/Footer";

/**
 * 날짜와 조회수를 렌더링하는 컴포넌트
 *
 * @param {Object} props - 컴포넌트에 전달되는 속성
 * @param {string} props.reg - 게시글 등록 날짜
 * @param {number} props.view - 게시글 조회수
 * @returns {JSX.Element} 날짜와 조회수를 표시하는 JSX 요소
 */
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

/**
 * 관리자 기능 버튼을 렌더링하는 컴포넌트
 *
 * @param {Object} props - 컴포넌트에 전달되는 속성
 * @param {boolean} props.isLoggedIn - 로그인 상태
 * @param {string} props.token - 인증 토큰
 * @param {number} props.postSeq - 게시글 시퀀스 번호
 * @param {Object} props.post - 게시글 정보
 * @param {Function} props.setChangePinned - 게시글 고정 상태 변경 함수
 * @returns {JSX.Element} 관리자 기능 버튼을 표시하는 JSX 요소
 */
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

/**
 * 하단의 '목록으로' 버튼을 렌더링하는 컴포넌트
 *
 * @param {Object} props - 컴포넌트에 전달되는 속성
 * @param {Function} props.navigate - 페이지 탐색 함수
 * @returns {JSX.Element} 하단의 '목록으로' 버튼을 표시하는 JSX 요소
 */
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

/**
 * 게시글 페이지를 렌더링하는 컴포넌트
 *
 * @returns {JSX.Element} 게시글 페이지를 표시하는 JSX 요소
 */
function PostPage() {
  const { postSeq } = useParams();
  const navigate = useNavigate();

  const token = useRecoilValue(tokenState);
  const isLoggedIn = useRecoilValue(isLoggedInState);

  const [userInfo, setUserInfo] = useState(null);
  const [post, setPost] = useState(null);
  const [changePinned, setChangePinned] = useState(false);

  /**
   * 사용자 정보를 로드하는 비동기 함수
   *
   * @returns {Promise<void>}
   */
  async function LoadUserInfo() {
    const result = await LoadAccountFunction();

    if (result.result) {
      setUserInfo(result.profileResult);

      return;
    }

    alert("사용자 정보를 불러오지 못했습니다.");
    return;
  }

  /**
   * 게시글 정보를 로드하는 비동기 함수
   *
   * @returns {Promise<void>}
   */
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
