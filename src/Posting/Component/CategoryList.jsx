function CategoryList({ categoryList, setCategory }) {
  return categoryList.map((category, index) => {
    function onClickCategory() {
      setCategory(category);
    }
    return (
      <div onzClick={onClickCategory} key={index}>
        <p>{category}</p>
      </div>
    );
  });
}

export default CategoryList;
