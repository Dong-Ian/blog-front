import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useSetRecoilState } from "recoil";
import { isLoggedInState, tokenState } from "../../Utils/Atom";

import styles from "../Style/Login.module.css";

import LoginFunction from "../Function/LoginFunction";
import LoadAccountFunction from "../../Account/Function/LoadAccountFunction";

import Email from "../Component/Email";
import Password from "../Component/Password";

/**
 * 애플리케이션의 로그인 페이지를 렌더링하는 컴포넌트
 *
 * @component
 * @returns {JSX.Element} 로그인 페이지 컴포넌트를 반환
 */
function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setToken = useSetRecoilState(tokenState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const [title, setTitle] = useState(null);
  const [color, setColor] = useState(null);

  /**
   * 로그인 폼 제출을 처리하는 함수
   *
   * @async
   * @param {Object} e - 폼 제출 이벤트 객체
   * @returns {Promise<void>} 로그인 프로세스가 완료되면 resolve되는 프로미스를 반환
   */
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

  /**
   * 계정 정보를 로드하여 로그인 페이지를 커스터마이징하는 함수
   *
   * @async
   * @returns {Promise<void>} 계정 정보 로드가 완료되면 resolve되는 프로미스를 반환
   */
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
    <>
      <Helmet title="Login" />
      <div className={styles.login} style={{ backgroundColor: color }}>
        <div className={styles.title}>
          <p>Welcome to {title}</p>
        </div>
        <div className={styles.outer_box}>
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
      </div>
    </>
  );
}

export default LoginPage;
