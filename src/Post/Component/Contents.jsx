import { useEffect } from "react";
import styles from "../Style/post.module.css";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";

function Contents({ post }) {
  const htmlString = post.postContents;

  const applyStyles = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

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

  const modifiedHtml = applyStyles(htmlString);

  useEffect(() => {
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
