import EncryptFunction from "../../Utils/Function/EncryptFunction";

/**
 * 사용자의 이메일과 비밀번호를 암호화하여 로그인 요청을 보내는 함수
 *
 * @async
 * @param {Object} params - 로그인에 필요한 매개변수 객체
 * @param {string} params.email - 사용자의 이메일
 * @param {string} params.password - 사용자의 비밀번호
 * @returns {Promise<Object>} 서버의 응답 객체를 포함한 프로미스
 */
export default async function LoginFunction({ email, password }) {
  // 이메일과 비밀번호를 암호화
  const encryptedEmail = EncryptFunction({ data: email });
  const encryptedPassword = EncryptFunction({ data: password });

  // 로그인 요청을 서버에 전송
  const result = await fetch(`${process.env.REACT_APP_API}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: encryptedEmail,
      password: encryptedPassword,
    }),
  });

  // 서버로부터 받은 응답을 JSON 형식으로 변환
  const res = await result.json();

  return res;
}
