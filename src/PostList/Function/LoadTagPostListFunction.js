/**
 * 특정 태그가 붙은 게시물 목록을 서버에서 가져오는 함수
 *
 * @param {Object} params - 요청에 대한 파라미터 객체
 * @param {string} params.tag - 검색할 태그
 * @param {number} params.page - 페이지 번호
 * @param {number} params.size - 페이지당 게시물 수
 * @returns {Promise<Object>} 서버로부터 받은 JSON 형태의 응답
 */
export default async function LoadTagPostListFunction({ tag, page, size }) {
  // 특정 태그가 붙은 게시물 목록을 요청하는 POST 요청을 보냄
  const result = await fetch(
    `${process.env.REACT_APP_API}/post/list/tag?page=${page}&size=${size}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tag: tag, // 검색할 태그
        blogId: process.env.REACT_APP_BLOG_ID, // 블로그 식별을 위한 블로그 ID
      }),
    }
  );

  // 서버로부터 받은 응답을 JSON 형태로 파싱
  const res = await result.json();

  return res; // 파싱된 JSON 응답을 반환
}
