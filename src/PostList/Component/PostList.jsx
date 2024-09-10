import { useNavigate } from "react-router-dom";
import * as cheerio from "cheerio";
import styles from "../Style/postlist.module.css";
import { useEffect, useState } from "react";

/**
 * 카테고리 렌더링 컴포넌트
 *
 * @param {Object} props - 컴포넌트의 props
 * @param {string} props.category - 카테고리 이름
 * @returns {JSX.Element} 카테고리 이름을 표시하는 컴포넌트
 */
function CategoryRender({ category, isMobileScreen }) {
  return (
    <div
      className={
        isMobileScreen
          ? `${styles.category} ${styles.small_category}`
          : styles.category
      }
    >
      <p>{category}</p>
    </div>
  );
}

/**
 * 제목 렌더링 컴포넌트
 *
 * @param {Object} props - 컴포넌트의 props
 * @param {string} props.title - 게시글 제목
 * @returns {JSX.Element} 게시글 제목을 표시하는 컴포넌트
 */
function TitleRender({ title, isMobileScreen }) {
  return (
    <div
      className={
        isMobileScreen
          ? `${styles.title} ${styles.small_title}`
          : `${styles.title} ${styles.big_title}`
      }
    >
      <p>{title}</p>
    </div>
  );
}

/**
 * 내용 렌더링 컴포넌트
 * HTML 콘텐츠를 텍스트로 변환하여 게시글 내용의 일부만 표시
 *
 * @param {Object} props - 컴포넌트의 props
 * @param {string} props.contents - 게시글 내용 (HTML 형식)
 * @returns {JSX.Element} 변환된 게시글 내용을 표시하는 컴포넌트
 */
function ContentsRender({ contents }) {
  const inputText = contents;
  const $ = cheerio.load(inputText);

  let transformedText = "";
  const traverse = (node) => {
    node.contents().each((index, child) => {
      if (child.type === "text") {
        transformedText += $(child).text();
      } else if (child.type === "tag") {
        traverse($(child));
        transformedText += " ";
      }
    });
  };

  traverse($.root());

  transformedText = transformedText.replace(/\s+/g, " ").trim();
  const slicedText = transformedText.slice(0, 100);

  return (
    <div className={styles.contents}>
      <p className={styles.post}>
        {slicedText}
        {transformedText.length > 100 ? (
          <span className={styles.more}> 더보기...</span>
        ) : null}
      </p>
    </div>
  );
}

/**
 * 날짜 및 조회수 렌더링 컴포넌트
 *
 * @param {Object} props - 컴포넌트의 props
 * @param {string} props.reg - 게시글 등록일 (ISO 문자열)
 * @param {number} props.view - 게시글 조회수
 * @returns {JSX.Element} 게시글의 등록일과 조회수를 표시하는 컴포넌트
 */
function DateTimeRender({ reg, view }) {
  const date = new Date(reg);
  date.setHours(date.getHours() + 9); // 한국 시간으로 조정

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
 * 게시글 목록 렌더링 컴포넌트
 *
 * @param {Object} props - 컴포넌트의 props
 * @param {Array<Object>} props.postList - 게시글 목록 배열
 * @returns {JSX.Element} 게시글 목록을 렌더링하는 컴포넌트
 */
function PostList({ postList }) {
  const navigate = useNavigate();
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  function handleResize() {
    setIsMobileScreen(window.innerWidth <= 500);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return postList.map((post, index) => {
    return (
      <div key={post.postSeq}>
        <div
          className={styles.postlist_box}
          onClick={() =>
            navigate(`/post/${post.postSeq}`, {
              state: { postSeq: post.postSeq },
            })
          }
        >
          <CategoryRender
            category={post.categoryName}
            isMobileScreen={isMobileScreen}
          />
          <TitleRender title={post.postTitle} isMobileScreen={isMobileScreen} />
          <ContentsRender contents={post.postContents} />
          <DateTimeRender reg={post.regDate} view={post.viewed} />
        </div>

        <div
          className={index !== postList.length - 1 ? styles.hr : styles.hr2}
        />
      </div>
    );
  });
}

export default PostList;
