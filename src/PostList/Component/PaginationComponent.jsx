import { useEffect } from "react";

import styles from "../Style/pagination.module.css";

import Pagination from "react-js-pagination";
import { useRecoilValue } from "recoil";
import { ColorState } from "../../Utils/Atom";

function PaginationComponent({
  totalCount,
  onChange,
  activePage,
  itemsCountPerPage,
}) {
  const color = useRecoilValue(ColorState);

  useEffect(() => {
    const allElements = document.querySelectorAll(`.${styles.pagination} li`);
    allElements.forEach((element) => {
      element.style.backgroundColor = "white";
      element.style.border = `1px solid ${color.background}`;
      const link = element.querySelector("a");
      if (link) {
        link.style.color = "black";
      }
    });

    const activeElement = document.querySelector(
      `.${styles.pagination} .current`
    );

    const disabledElement = document.querySelectorAll(
      `.${styles.pagination} .disabled`
    );

    if (activeElement) {
      activeElement.style.backgroundColor = color.background;
      const link = activeElement.querySelector("a");
      if (link) {
        link.style.color = "white";
      }
    }

    disabledElement.forEach((element) => {
      element.style.backgroundColor = "lightgray";
      element.style.border = "1px solid lightgray";
      const link = element.querySelector("a");
      if (link) {
        link.style.color = "white";
      }
    });
  }, [activePage]);

  return (
    <div className={styles.pagination}>
      <Pagination
        className={styles.pagination}
        totalItemsCount={Number(totalCount)}
        onChange={onChange}
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        nextPageText=">"
        prevPageText="< "
        activeClass="current"
        unActiveElement="unactive"
      />
    </div>
  );
}

export default PaginationComponent;
