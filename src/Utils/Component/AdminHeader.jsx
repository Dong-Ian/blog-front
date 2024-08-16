import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { tokenState } from "../Atom";

import styles from "./Style/component.module.css";

import LoadAccountFunction from "../../Account/Function/LoadAccountFunction";
import JWTTestFunction from "../Function/JWTTestFunction";

function AdminHeader({ state }) {
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);

  const [title, setTitle] = useState(null);

  async function LoadAccount() {
    const result = await LoadAccountFunction();

    if (result.result) {
      setTitle(result.profileResult.title);
    }

    return;
  }

  async function JWTTest() {
    const result = await JWTTestFunction({ token });

    if (!result.code) {
      alert("세션이 만료되었습니다.");
      navigate("/");

      return;
    }

    return;
  }

  useEffect(() => {
    LoadAccount();
    JWTTest();
  }, []);

  if (title) {
    return (
      <div
        className={styles.header}
        style={{ backgroundColor: state.background }}
      >
        <p onClick={() => navigate("/")}>{title}</p>
      </div>
    );
  }
}

export default AdminHeader;
