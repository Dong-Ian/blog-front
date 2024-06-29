import { useEffect } from "react";
import styles from "../Style/post.module.css";

// import quill_styles from "../Style/Quill.module.css";

import hljs from "highlight.js";
import "highlight.js/styles/dark.css";

function Contents({ post }) {
  const htmlString = post.postContents;

  const applyStyles = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    return doc.body.innerHTML;
  };

  const modifiedHtml = applyStyles(htmlString);

  useEffect(() => {
    hljs.highlightAll();
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
