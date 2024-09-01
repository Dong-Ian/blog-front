/**
 * 새로운 포스트를 등록하는 비동기 함수
 *
 * 이 함수는 API 호출을 통해 새로운 포스트를 등록한다.
 * 필요한 데이터는 함수의 매개변수로 제공되며, API 호출 후 응답 결과를 JSON 형식으로 반환한다.
 *
 * @async
 * @function PostingFunction
 * @param {Object} params - 포스트 등록에 필요한 데이터
 * @param {string} params.token - 인증 토큰
 * @param {string} params.postTitle - 포스트 제목
 * @param {string} params.postContents - 포스트 내용
 * @param {Array<number>} params.imageSeqs - 이미지 시퀀스 배열
 * @param {Array<string>} params.tags - 포스트 태그 배열
 * @param {string} params.category - 포스트 카테고리
 * @param {string} params.isPinned - 포스트 고정 여부 (값은 "0" 또는 "1")
 * @returns {Promise<Object>} 포스트 등록 결과를 포함한 응답 객체를 반환하는 프로미스
 */
export default async function PostingFunction({
  token,
  postTitle,
  postContents,
  imageSeqs,
  tags,
  category,
  isPinned,
}) {
  // API 호출을 통해 포스트 등록 요청
  const result = await fetch(
    `${process.env.REACT_APP_API}/admin/post/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postTitle: postTitle, // 포스트 제목
        postContents: postContents, // 포스트 내용
        imageSeqs: imageSeqs, // 이미지 시퀀스 배열
        tags: tags, // 포스트 태그 배열
        category: category, // 포스트 카테고리
        isPinned: isPinned, // 포스트 고정 여부
      }),
    }
  );

  // JSON 형식으로 응답 데이터 파싱
  const res = await result.json();

  return res; // 응답 데이터 반환
}
