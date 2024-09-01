import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SignUpFunction from "../Function/SignUpFunction";

/**
 * 회원가입 페이지 컴포넌트
 * 사용자로부터 이름, 이메일, 비밀번호를 입력받아 회원가입을 처리
 */
function SignUpPage() {
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  // 사용자 입력을 관리하는 상태 변수
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * 회원가입 요청을 처리하는 함수
   * @param {Event} e - form 제출 이벤트
   */
  async function SignUp(e) {
    e.preventDefault(); // 기본 form 제출 동작 방지
    const result = await SignUpFunction({ name, email, password }); // 회원가입 함수 호출

    if (!result.result) {
      alert("회원가입에 실패하였습니다."); // 실패 시 경고 메시지 출력
      return;
    }

    alert("회원가입에 성공하였습니다."); // 성공 시 메시지 출력
    navigate("/login"); // 로그인 페이지로 이동
    return;
  }

  /**
   * 이름 입력 핸들러
   * @param {Event} event - 입력 이벤트
   */
  function handleName(event) {
    const {
      target: { value },
    } = event;
    setName(value); // 이름 상태 업데이트
  }

  /**
   * 이메일 입력 핸들러
   * @param {Event} event - 입력 이벤트
   */
  function handleEmail(event) {
    const {
      target: { value },
    } = event;
    setEmail(value); // 이메일 상태 업데이트
  }

  /**
   * 비밀번호 입력 핸들러
   * @param {Event} event - 입력 이벤트
   */
  function handlePassword(event) {
    const {
      target: { value },
    } = event;
    setPassword(value); // 비밀번호 상태 업데이트
  }

  return (
    <div>
      <p>Sign Up</p>
      <form method="post" onSubmit={SignUp}>
        <p>name</p>
        <input
          onChange={handleName}
          type="text"
          name="name"
          placeholder="이름"
          value={name}
        />
        <p>email</p>
        <input
          onChange={handleEmail}
          type="text"
          name="email"
          placeholder="이메일"
          value={email}
        />
        <p>password</p>
        <input
          onChange={handlePassword}
          type="password"
          name="password"
          placeholder="비밀번호"
          value={password}
        />
        <input type="submit" value="회원가입" />
      </form>
    </div>
  );
}

export default SignUpPage;
