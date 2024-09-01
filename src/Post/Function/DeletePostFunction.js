/**
 * 게시글을 삭제하는 함수
 *
 * @param {Object} params - 함수에 전달되는 파라미터
 * @param {string} params.token - 인증 토큰
 * @param {number} params.postSeq - 삭제할 게시글의 시퀀스 번호
 * @returns {Promise<Object>} 삭제 요청의 결과를 담고 있는 응답 객체
 */
export default async function DeletePostFunction({ token, postSeq }) {
  const result = await fetch(`${process.env.REACT_APP_API}/admin/post/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      postSeq: postSeq,
    }),
  });

  const res = await result.json();

  return res;
}
