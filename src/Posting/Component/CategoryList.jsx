function CategoryList({ categoryList, setCategory }) {
  return categoryList.map((category, index) => {
    function onClickCategory() {
      setCategory(category);
    }

    return (
      <div onClick={onClickCategory} key={index}>
        <div>
          <p>{category}</p>
        </div>
      </div>
    );
  });
}

export default CategoryList;
