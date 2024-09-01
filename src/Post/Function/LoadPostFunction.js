/**
 * 게시글 내용을 불러오는 함수
 *
 * @param {Object} params - 함수에 전달되는 파라미터
 * @param {number} params.postSeq - 불러올 게시글의 시퀀스 번호
 * @returns {Promise<Object>} 게시글 내용 요청의 결과를 담고 있는 응답 객체
 */
export default async function LoadPostFunctioin({ postSeq }) {
  const result = await fetch(`${process.env.REACT_APP_API}/post/contents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postSeq: postSeq,
      blogId: process.env.REACT_APP_BLOG_ID,
    }),
  });

  const res = await result.json();

  return res;
}
