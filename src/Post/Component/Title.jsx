import styles from "../Style/post.module.css";

/**
 * 게시글 제목을 렌더링하는 컴포넌트
 *
 * @param {Object} props - 컴포넌트의 속성
 * @param {string} props.title - 게시글 제목
 * @returns {JSX.Element} 제목을 포함하는 div 요소
 */
function Title({ title, isMobileScreen }) {
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

export default Title;
