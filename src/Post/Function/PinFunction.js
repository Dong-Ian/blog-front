/**
 * 게시글을 고정하는 함수
 *
 * @param {Object} params - 함수에 전달되는 파라미터
 * @param {string} params.token - 인증 토큰
 * @param {number} params.postSeq - 고정할 게시글의 시퀀스 번호
 * @returns {Promise<Object>} 게시글 고정 요청의 결과를 담고 있는 응답 객체
 */
export default async function PinFunction({ token, postSeq }) {
  const result = await fetch(
    `${process.env.REACT_APP_API}/admin/post/update/pin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postSeq: postSeq,
        blogId: process.env.REACT_APP_BLOG_ID,
      }),
    }
  );

  const res = await result.json();

  return res;
}
