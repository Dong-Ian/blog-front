/**
 * 게시글의 고정을 해제하는 함수
 *
 * @param {Object} params - 함수에 전달되는 파라미터
 * @param {string} params.token - 인증 토큰
 * @param {number} params.postSeq - 고정 해제할 게시글의 시퀀스 번호
 * @returns {Promise<Object>} 게시글 고정 해제 요청의 결과를 담고 있는 응답 객체
 */
export default async function UnPinFunction({ token, postSeq }) {
  const result = await fetch(
    `${process.env.REACT_APP_API}/admin/post/update/unpin`,
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
