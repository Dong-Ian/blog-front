import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../Style/home.module.css";

import LoadCategoryFunction from "../../Posting/Function/LoadCategoryFunction";

/**
 * 카테고리 리스트를 렌더링하는 컴포넌트
 * 카테고리 목록을 클릭하면 해당 카테고리로 이동
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string[]} props.categoryList - 카테고리 목록 배열
 * @returns {JSX.Element} 카테고리 렌더링 컴포넌트
 */
function CategoryRender({ categoryList }) {
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  if (categoryList.length != 0) {
    // 카테고리 목록이 존재할 경우
    return (
      <div>
        {categoryList.map((category) => (
          <p
            key={category}
            onClick={() =>
              navigate(`/postlist/category/${category}`, {
                state: { category: category },
              })
            }
          >
            {category}
          </p>
        ))}
      </div>
    );
  } else {
    // 카테고리 목록이 없을 경우
    return <div className={styles.nullpost2}>등록된 카테고리가 없습니다.</div>;
  }
}

/**
 * 카테고리 컴포넌트
 * 카테고리 데이터를 불러와 렌더링
 *
 * @returns {JSX.Element} 카테고리 컴포넌트
 */
function Category() {
  const [categoryList, setCatgoryList] = useState(null); // 카테고리 목록 상태 관리

  /**
   * 카테고리 목록을 불러오는 함수
   */
  async function LoadCategory() {
    const result = await LoadCategoryFunction(); // 카테고리 목록 API 호출

    if (result.result) {
      setCatgoryList(result.categoryList || []); // 카테고리 목록 상태 업데이트
    }
  }

  // 컴포넌트가 처음 렌더링될 때 카테고리 목록을 불러옴
  useEffect(() => {
    LoadCategory();
  }, []);

  // 카테고리 목록이 로드된 경우 렌더링
  if (categoryList) {
    return (
      <div className={styles.category}>
        <p>카테고리</p>
        <CategoryRender categoryList={categoryList} />
      </div>
    );
  }
}

export default Category;
