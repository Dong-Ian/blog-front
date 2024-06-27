import Pagination from "react-js-pagination";

import styles from "../Style/pagination.module.css";

function PaginationComponent({
  totalCount,
  onChange,
  activePage,
  itemsCountPerPage,
}) {
  return (
    <div className={styles.pagination_div}>
      <Pagination
        className={styles.pagination}
        totalItemsCount={Number(totalCount)}
        onChange={onChange}
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        nextPageText=">"
        prevPageText="< "
      />
    </div>
  );
}

export default PaginationComponent;
