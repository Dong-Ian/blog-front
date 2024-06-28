import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { isLoggedInState, tokenState } from "../../Utils/Atom";

import styles from "../Style/Login.module.css";

import LoginFunction from "../Function/LoginFunction";
import LoadAccountFunction from "../../Account/Function/LoadAccountFunction";

import Email from "../Component/Email";
import Password from "../Component/Password";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useRecoilState(tokenState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const [title, setTitle] = useState(null);
  const [color, setColor] = useState(null);

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

  async function LoadAccount() {
    const result = await LoadAccountFunction();

    if (result.result) {
      setColor(result.profileResult.color);
      setTitle(result.profileResult.title);

      return;
    }

    setColor("#000");
    setTitle("Archive");
    return;
  }

  useEffect(() => {
    LoadAccount();
  }, []);

  return (
    <div className={styles.login} style={{ backgroundColor: color }}>
      <div className={styles.title}>
        <p>Welcome to {title}</p>
      </div>

      <form className={styles.box} method="post" onSubmit={Login}>
        <Email email={email} setEmail={setEmail} />
        <Password password={password} setPassword={setPassword} />
        <input
          className={styles.loginBtn}
          style={{ backgroundColor: color }}
          type="submit"
          value="로그인"
        />
      </form>
    </div>
  );
}

export default LoginPage;
