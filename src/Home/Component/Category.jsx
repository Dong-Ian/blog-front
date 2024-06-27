import { useEffect, useState } from "react";
import LoadCategoryFunction from "../../Posting/Function/LoadCategoryFunction";

function CategoryRender({ categoryList }) {
  return categoryList.map((category) => {
    return (
      <div>
        <p>{category}</p>
      </div>
    );
  });
}

function Category() {
  const [categoryList, setCatgoryList] = useState(null);

  async function LoadCategory() {
    const result = await LoadCategoryFunction();

    if (result.result) {
      setCatgoryList(result.categoryList);
    }
  }
  useEffect(() => {
    LoadCategory();
  }, []);

  if (categoryList) {
    return (
      <div>
        <CategoryRender categoryList={categoryList} />
      </div>
    );
  }
}

export default Category;
