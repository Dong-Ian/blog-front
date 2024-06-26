import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ColorState, isLoggedInState } from "../Utils/Atom";

import styles from "./Style/component.module.css";

import LoadAccountFunction from "../Account/Function/LoadAccountFunction";
import accountIcon from "../Utils/Asset/person_white.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const [title, setTitle] = useState(null);
  const [color, setColor] = useRecoilState(ColorState);
  const [isLoggedIn] = useRecoilState(isLoggedInState);

  async function LoadAccount() {
    const result = await LoadAccountFunction();

    if (result.result) {
      setTitle(result.profileResult.title);
      setColor({ background: result.profileResult.color });
    }

    return;
  }

  useEffect(() => {
    LoadAccount();
  }, []);

  if (title) {
    return (
      <>
        <div
          className={styles.header}
          style={{ backgroundColor: color.background }}
        >
          <p>{title}</p>

          <div className={styles.box}>
            {isLoggedIn && (
              <img
                src={accountIcon}
                alt=""
                onClick={() => navigate("/admin")}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Header;
