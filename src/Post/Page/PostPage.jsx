import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { isLoggedInState, tokenState } from "../../Utils/Atom";

import styles from "../Style/post.module.css";

import LoadPostFunctioin from "../Function/LoadPostFunction";

import Contents from "../Component/Contents";
import DeleteButton from "../Component/DeleteButton";
import UnPinButton from "../Component/UnPinButton";
import PinButton from "../Component/PinButton";
import Tag from "../Component/Tag";
import Header from "../../Component/Header";
import EditPostButton from "../Component/EditPostButton";
import Comment from "../Component/Comment";

function TitleRender({ title }) {
  return (
    <div className={styles.title}>
      <p>{title}</p>
    </div>
  );
}

function DateRender({ reg, mod, view }) {
  const date = new Date(reg);

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

function PostPage() {
  const { postSeq } = useParams();
  const navigate = useNavigate();

  const token = useRecoilValue(tokenState);
  const isLoggedIn = useRecoilValue(isLoggedInState);

  const [post, setPost] = useState(null);
  const [changePinned, setChangePinned] = useState(false);

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
  }, [changePinned]);

  if (post) {
    return (
      <>
        <Header />
        <div className={styles.outer_post_box}>
          <div className={styles.post_box}>
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

            <TitleRender title={post.postTitle} />
            <Tag tagList={post.tags} />
            <DateRender
              reg={post.regDate}
              mod={post.modDate}
              view={post.viewed}
            />

            <hr className={styles.hr} />
            <Contents post={post} />
            <hr className={styles.hr} />

            {isLoggedIn && (
              <div className={styles.btn_box}>
                <DeleteButton token={token} postSeq={postSeq} />
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
                <EditPostButton postSeq={postSeq} />
              </div>
            )}
          </div>
          <Comment post={post} />
        </div>
      </>
    );
  }
}

export default PostPage;
