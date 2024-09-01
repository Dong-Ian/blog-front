import React from "react";
import styles from "../Style/post.module.css";

/**
 * 게시물의 제목과 본문에서 추출한 헤딩 목록을 렌더링하는 컴포넌트
 *
 * @param {Object} props - 컴포넌트의 속성
 * @param {Object} props.post - 게시물 데이터
 * @param {string} props.post.postContents - 게시물의 HTML 콘텐츠
 * @param {string} props.post.postTitle - 게시물의 제목
 * @returns {JSX.Element} 제목과 헤딩 목록을 포함하는 div 요소
 */
function HeaderTagList({ post }) {
  /**
   * HTML 콘텐츠에서 헤딩 요소를 추출하고 스타일을 적용하는 함수
   *
   * @param {string} html - HTML 콘텐츠
   * @returns {Array<Object>} 추출된 헤딩 요소의 배열
   */
  const applyStyles = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const headingElements = Array.from(doc.body.querySelectorAll("h1, h2")).map(
      (el, index) => {
        const level = el.tagName === "H1" ? 1 : 2;
        const id = `${el.tagName.toLowerCase()}-${index}`;
        el.id = id;
        return { text: el.textContent, id, level };
      }
    );

    return headingElements;
  };

  const headings = applyStyles(post.postContents);

  /**
   * 헤딩 클릭 시 해당 헤딩 위치로 스크롤하는 함수
   *
   * @param {string} id - 클릭된 헤딩의 ID
   */
  const handleHeadingClick = (id) => {
    const element = document.getElementById(id);

    if (element) {
      const yPosition =
        element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  return (
    <>
      {headings.length > 0 && (
        <div className={styles.headingList}>
          <h2>{post.postTitle.slice(0, 15)}...</h2>
          <ul>
            {headings.map(({ text, id, level }, index) => (
              <li
                key={index}
                onClick={() => handleHeadingClick(id)}
                className={level === 2 ? styles.h2Item : styles.h1Item}
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default HeaderTagList;
