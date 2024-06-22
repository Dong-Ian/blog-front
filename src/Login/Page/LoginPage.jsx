import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { isLoggedInState, tokenState } from "../../Utils/Atom";

import LoginFunction from "../Function/LoginFunction";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useRecoilState(tokenState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  async function Login(e) {
    e.preventDefault();
    const result = await LoginFunction({ email, password });

    if (!result.result) {
      alert("이메일/비밀번호가 일치하지 않습니다.");
      return;
    }
    setToken(result.token);
    setIsLoggedIn(true);
    navigate("/");

    return;
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
      <p>Login</p>
      <form method="post" onSubmit={Login}>
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
        <input type="submit" value="로그인" />
      </form>
    </div>
  );
}

export default LoginPage;
