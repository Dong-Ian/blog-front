function CategoryList({ categoryList, category, setCategory }) {
  return categoryList.map((category, index) => {
    function onClickCategory() {
      setCategory(category);
    }
    return (
      <div onClick={onClickCategory} key={index}>
        <p>{category}</p>
      </div>
    );
  });
}

export default CategoryList;
