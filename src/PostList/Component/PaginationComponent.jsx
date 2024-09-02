import { useEffect } from "react";
import styles from "../Style/pagination.module.css";
import Pagination from "react-js-pagination";
import { useRecoilValue } from "recoil";
import { ColorState } from "../../Utils/Atom";

/**
 * PaginationComponent는 페이지네이션을 표시하는 컴포넌트입니다.
 * 페이지네이션을 클릭하면 onChange 콜백이 호출됩니다.
 * 현재 페이지와 전체 페이지 수에 따라 페이지네이션의 스타일을 업데이트합니다.
 *
 * @param {Object} props - 컴포넌트의 props
 * @param {number} props.totalCount - 전체 아이템 수
 * @param {Function} props.onChange - 페이지가 변경될 때 호출되는 콜백 함수
 * @param {number} props.activePage - 현재 활성 페이지 번호
 * @param {number} props.itemsCountPerPage - 페이지당 아이템 수
 * @returns {JSX.Element} 페이지네이션을 표시하는 컴포넌트
 */
function PaginationComponent({
  totalCount,
  onChange,
  activePage,
  itemsCountPerPage,
}) {
  const color = useRecoilValue(ColorState);

  useEffect(() => {
    // 모든 페이지네이션 항목의 스타일을 업데이트합니다.
    const allElements = document.querySelectorAll(`.${styles.pagination} li`);
    allElements.forEach((element) => {
      element.style.backgroundColor = "white";
      element.style.border = `1px solid ${color.background}`;
      const link = element.querySelector("a");
      if (link) {
        link.style.color = "black";
      }
    });

    // 활성화된 페이지네이션 항목의 스타일을 업데이트합니다.
    const activeElement = document.querySelector(
      `.${styles.pagination} .current`
    );

    // 비활성화된 페이지네이션 항목의 스타일을 업데이트합니다.
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
  }, [activePage]); // activePage가 변경될 때마다 스타일 업데이트

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
