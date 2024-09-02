/**
 * 사용자 프로필 데이터를 로드하는 함수
 *
 * @returns {Promise<Object>} 사용자 프로필 데이터
 */
export default async function LoadAccountFunction() {
  const result = await fetch(`${process.env.REACT_APP_API}/user/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      blogId: process.env.REACT_APP_BLOG_ID,
    }),
  });

  // 응답을 JSON으로 변환
  const res = await result.json();

  return res;
}
