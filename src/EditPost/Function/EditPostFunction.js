/**
 * 게시물을 수정하기 위한 함수
 *
 * 서버에 게시물 수정 요청을 보내고, 결과를 반환함
 *
 * @param {Object} params - 게시물 수정에 필요한 매개변수 객체
 * @param {string} params.token - 인증 토큰
 * @param {number} params.postSeq - 게시물 고유 번호
 * @param {string} params.postTitle - 수정할 게시물 제목
 * @param {string} params.postContents - 수정할 게시물 내용
 * @param {boolean} params.isPinned - 게시물 상단 고정 여부
 * @param {Array<string>} params.tags - 게시물에 포함될 태그 목록
 * @param {string} params.category - 게시물 카테고리
 * @returns {Promise<Object>} 서버로부터의 응답 데이터를 포함한 Promise 객체
 */
export default async function EditPostFunction({
  token,
  postSeq,
  postTitle,
  postContents,
  isPinned,
  tags,
  category,
}) {
  const result = await fetch(`${process.env.REACT_APP_API}/admin/post/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      postSeq: postSeq,
      postTitle: postTitle,
      postContents: postContents,
      isPinned: isPinned,
      tags: tags,
      category: category,
    }),
  });

  const res = await result.json();

  return res;
}
