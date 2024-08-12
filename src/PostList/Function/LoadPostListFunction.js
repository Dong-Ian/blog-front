export default async function LoadPostListFunction({ page, size }) {
  const result = await fetch(
    `${process.env.REACT_APP_API}/post/list?page=${page}&size=${size}`,
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
