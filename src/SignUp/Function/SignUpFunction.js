import EncryptFunction from "../../Utils/Function/EncryptFunction";

/**
 * 사용자 회원가입을 처리하는 함수
 *
 * @async
 * @function
 * @param {Object} param - 사용자 정보가 포함된 객체
 * @param {string} param.name - 사용자의 이름
 * @param {string} param.email - 사용자의 이메일 주소
 * @param {string} param.password - 사용자의 비밀번호
 * @returns {Promise<Object>} 회원가입 요청에 대한 서버 응답
 */
export default async function SignUpFunction({ name, email, password }) {
  // 이메일, 비밀번호, 이름을 암호화
  const encryptedEmail = EncryptFunction({ data: email });
  const encryptedPassword = EncryptFunction({ data: password });
  const encryptedName = EncryptFunction({ data: name });

  // 암호화된 사용자 데이터를 포함한 객체 생성
  const userData = {
    name: encryptedName,
    email: encryptedEmail,
    password: encryptedPassword,
    blogId: process.env.REACT_APP_BLOG_ID, // 환경 변수에서 가져온 블로그 ID
  };

  // 회원가입 API에 요청 전송
  const result = await fetch(`${process.env.REACT_APP_API}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData), // 요청 본문에 JSON 문자열로 변환한 사용자 데이터 포함
  });

  // 서버로부터 받은 응답을 JSON 형식으로 파싱
  const res = await result.json();

  // 서버 응답 반환
  return res;
}
