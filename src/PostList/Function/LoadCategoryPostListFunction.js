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
        blogId: process.env.REACT_APP_BLOG_ID,
      }),
    }
  );

  const res = await result.json();

  return res;
}
