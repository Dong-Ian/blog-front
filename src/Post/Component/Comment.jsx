import { useEffect, useRef } from "react";

/**
 * 댓글을 표시하는 컴포넌트
 *
 * @param {Object} props - 컴포넌트의 속성
 * @param {Object} props.post - 댓글을 표시할 게시물
 * @returns {JSX.Element} 댓글을 표시하는 div 요소
 */
function Comment({ post }) {
  // 댓글 스크립트를 추가할 요소에 대한 참조
  const commentsEl = useRef(null);

  useEffect(() => {
    // 댓글 스크립트를 동적으로 생성하여 삽입
    const scriptEl = document.createElement("script");
    scriptEl.async = true;
    scriptEl.src = "https://utteranc.es/client.js"; // Utterances 댓글 스크립트의 URL
    scriptEl.setAttribute("repo", process.env.REACT_APP_GITHUB_REPO); // GitHub 저장소 설정
    scriptEl.setAttribute("issue-term", "pathname"); // 댓글을 연결할 issue의 기준
    scriptEl.setAttribute("theme", "github-light"); // 댓글 테마 설정
    scriptEl.setAttribute("crossorigin", "anonymous"); // 크로스 오리진 설정
    commentsEl.current?.appendChild(scriptEl); // 댓글 스크립트를 div 요소에 추가
  }, [post]); // post가 변경될 때마다 실행

  return <div ref={commentsEl} />; // 댓글을 표시할 div 요소 반환
}

export default Comment;
