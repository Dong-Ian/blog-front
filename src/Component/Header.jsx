import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ColorState } from "../Utils/Atom";

import styles from "./Style/component.module.css";

import LoadAccountFunction from "../Account/Function/LoadAccountFunction";

function Header() {
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
        </div>
        <div className={styles.box} />
      </>
    );
  }
}

export default Header;
