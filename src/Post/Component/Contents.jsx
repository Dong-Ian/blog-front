import styles from "../Style/post.module.css";

function Contents({ post }) {
  const htmlString = post.postContents;

  const applyStyles = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    return doc.body.innerHTML;
  };

  const modifiedHtml = applyStyles(htmlString);

  return (
    <div
      className={styles.contents}
      dangerouslySetInnerHTML={{ __html: modifiedHtml }}
    />
  );
}

export default Contents;
