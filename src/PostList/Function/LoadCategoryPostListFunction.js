export default async function LoadCategoryPostListFunction({
  category,
  page,
  size,
}) {
  const result = await fetch(
    `${process.env.REACT_APP_API}/post/list/category?page=${page}&size=${size}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: category,
      }),
    }
  );

  const res = await result.json();

  // console.log("LoadCategoryPostListFunction result: %o", res);

  return res;
}
