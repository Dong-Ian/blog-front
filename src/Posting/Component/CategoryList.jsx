/**
 * 카테고리 목록을 렌더링하는 컴포넌트
 *
 * 이 컴포넌트는 주어진 카테고리 목록을 순회하며 각 카테고리를 클릭할 수 있는 항목으로 렌더링한다.
 * 사용자가 카테고리 항목을 클릭하면 해당 카테고리가 선택되고 `setCategory` 함수가 호출된다.
 *
 * @component
 * @param {Object} props - 컴포넌트의 속성
 * @param {Array<string>} props.categoryList - 렌더링할 카테고리 문자열 목록
 * @param {Function} props.setCategory - 선택된 카테고리를 설정하는 함수
 * @returns {JSX.Element} - 카테고리 목록을 렌더링한 JSX 요소
 */
function CategoryList({ categoryList, setCategory }) {
  /**
   * 카테고리 항목 클릭 시 호출되는 함수
   *
   * 사용자가 카테고리 항목을 클릭하면 이 함수가 호출되어
   * 선택된 카테고리를 `setCategory` 함수를 통해 설정한다.
   */
  function onClickCategory(category) {
    setCategory(category);
  }

  return (
    <>
      {categoryList.map((category, index) => (
        <div onClick={() => onClickCategory(category)} key={index}>
          <div>
            <p>{category}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default CategoryList;
