/**
 * 카테고리 목록을 로드하는 비동기 함수
 *
 * 이 함수는 API 호출을 통해 블로그의 카테고리 목록을 가져온다.
 * 호출 후, 응답 결과를 JSON 형식으로 반환한다.
 *
 * @async
 * @function LoadCategoryFunction
 * @returns {Promise<Object>} 카테고리 목록을 포함한 응답 객체를 반환하는 프로미스
 */
export default async function LoadCategoryFunction() {
  const result = await fetch(
    `${process.env.REACT_APP_API}/post/category/list`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogId: process.env.REACT_APP_BLOG_ID,
      }),
    }
  );

  const res = await result.json();

  return res;
}
