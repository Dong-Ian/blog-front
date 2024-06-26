export default async function LoadCategoryFunction() {
  const result = await fetch(
    `${process.env.REACT_APP_API}/post/category/list`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const res = await result.json();

  console.log("LoadCategoryFunction result: %o", res);

  return res;
}
