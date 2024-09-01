import { useNavigate } from "react-router-dom";
import styles from "../Style/post.module.css";

/**
 * 태그 목록을 렌더링하고 클릭 시 해당 태그의 게시글 목록 페이지로 이동하는 컴포넌트
 *
 * @param {Object} props - 컴포넌트의 속성
 * @param {string[]} props.tagList - 태그 문자열 배열
 * @returns {JSX.Element} 태그를 렌더링하는 div 요소
 */
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

/**
 * 태그를 감싸는 컨테이너 컴포넌트
 *
 * @param {Object} props - 컴포넌트의 속성
 * @param {string[]} props.tagList - 태그 문자열 배열
 * @returns {JSX.Element} 태그를 포함하는 div 요소
 */
function Tag({ tagList }) {
  return (
    <div className={styles.tag}>
      <TagRender tagList={tagList} />
    </div>
  );
}

export default Tag;
