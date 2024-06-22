import { useNavigate } from "react-router-dom";
import styles from "../Style/post.module.css";

function TagRender({ tagList }) {
  const navigate = useNavigate();

  return tagList.map((tag) => {
    const trimmedStr = tag.trim();
    return (
      <div
        onClick={() =>
          navigate(`/postlist/tag/${tag}`, {
            state: { tag: tag },
          })
        }
        key={tag}
      >
        <p># {trimmedStr}</p>
      </div>
    );
  });
}
function Tag({ tagList }) {
  return (
    <div className={styles.tag}>
      <TagRender tagList={tagList} />
    </div>
  );
}

export default Tag;
