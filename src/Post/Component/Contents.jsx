import { useEffect } from "react";
import styles from "../Style/post.module.css";

import hljs from "highlight.js";
import "highlight.js/styles/dark.css";

function Contents({ post }) {
  const htmlString = post.postContents;

  const applyStyles = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // 코드 블록을 찾아서 <code> 태그로 변환
    const preElements = doc.body.querySelectorAll("pre.ql-syntax");
    preElements.forEach((preElement) => {
      const codeElement = document.createElement("code");
      codeElement.textContent = preElement.textContent.trim();

      // 기존의 <pre> 태그 대체
      const newPreElement = document.createElement("pre");
      newPreElement.className = "ql-syntax";
      newPreElement.setAttribute("spellcheck", "false");
      newPreElement.appendChild(codeElement);

      preElement.parentNode.replaceChild(newPreElement, preElement);
    });

    return doc.body.innerHTML;
  };

  const modifiedHtml = applyStyles(htmlString);

  useEffect(() => {
    hljs.initHighlightingOnLoad();
  }, []);

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
