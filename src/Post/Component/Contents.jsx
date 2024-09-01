import { useEffect } from "react";
import styles from "../Style/post.module.css";
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";

/**
 * 게시물 내용을 렌더링하는 컴포넌트
 *
 * @param {Object} props - 컴포넌트의 속성
 * @param {Object} props.post - 게시물 객체
 * @param {string} props.post.postContents - 게시물 내용 (HTML 문자열)
 * @returns {JSX.Element} 게시물 내용을 렌더링하는 div 요소
 */
function Contents({ post }) {
  // 게시물 내용을 HTML 문자열로 저장
  const htmlString = post.postContents;

  /**
   * HTML 문자열에 스타일을 적용하여 수정된 HTML 문자열을 반환
   *
   * @param {string} html - HTML 문자열
   * @returns {string} 수정된 HTML 문자열
   */
  const applyStyles = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // h1, h2 요소에 ID 추가
    Array.from(doc.body.querySelectorAll("h1, h2")).map((el, index) => {
      const level = el.tagName === "H1" ? 1 : 2;
      const id = `${el.tagName.toLowerCase()}-${index}`;
      el.id = id;
      return { text: el.textContent, id, level };
    });

    // pre.ql-syntax 요소를 새로운 pre 요소로 교체
    const preElements = doc.body.querySelectorAll("pre.ql-syntax");
    preElements.forEach((preElement) => {
      const codeElement = document.createElement("code");
      codeElement.textContent = preElement.textContent.trim();

      const newPreElement = document.createElement("pre");
      newPreElement.className = "ql-syntax";
      newPreElement.setAttribute("spellcheck", "false");
      newPreElement.appendChild(codeElement);

      preElement.parentNode.replaceChild(newPreElement, preElement);
    });

    return doc.body.innerHTML;
  };

  // 스타일이 적용된 수정된 HTML 문자열
  const modifiedHtml = applyStyles(htmlString);

  useEffect(() => {
    // 코드 하이라이팅 적용
    hljs.highlightAll();
  }, [modifiedHtml]);

  return (
    <>
      <div
        className={styles.contents}
        dangerouslySetInnerHTML={{ __html: modifiedHtml }}
      />
    </>
  );
}

export default Contents;
