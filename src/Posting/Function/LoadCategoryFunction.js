export default async function LoadCategoryFunction() {
  const result = await fetch(
    `${process.env.REACT_APP_API}/post/category/list`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogId: process.env.REACT_APP_BLOG_ID,
      }),
    }
  );

  const res = await result.json();

  return res;
}
