import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SignUpFunction from "../Function/SignUpFunction";

function SignUpPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function SignUp(e) {
    e.preventDefault();
    const result = await SignUpFunction({ name, email, password });

    if (!result.result) {
      alert("회원가입에 실패하였습니다.");
      return;
    }

    alert("회원가입에 성공하였습니다.");
    navigate("/login");
    return;
  }

  function handleName(event) {
    const {
      target: { value },
    } = event;
    setName(value);
  }

  function handleEmail(event) {
    const {
      target: { value },
    } = event;
    setEmail(value);
  }

  function handlePassword(event) {
    const {
      target: { value },
    } = event;
    setPassword(value);
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
