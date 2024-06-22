import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { ColorState, tokenState } from "../Utils/Atom";

import styles from "./Style/component.module.css";

import LoadAccountFunction from "../Account/Function/LoadAccountFunction";
import JWTTestFunction from "../Utils/Function/JWTTestFunction";

function AdminHeader() {
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);

  const [title, setTitle] = useState(null);
  const [color, setColor] = useRecoilState(ColorState);

  async function LoadAccount() {
    const result = await LoadAccountFunction();

    if (result.result) {
      setTitle(result.profileResult.title);
      setColor({ background: result.profileResult.color });
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
    // JWTTest();
  }, []);

  if (title) {
    return (
      <div
        className={styles.header}
        style={{ backgroundColor: color.background }}
      >
        <p>{title}</p>
      </div>
    );
  }
}

export default AdminHeader;
