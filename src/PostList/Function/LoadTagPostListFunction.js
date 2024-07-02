export default async function LoadTagPostListFunction({ tag, page, size }) {
  const result = await fetch(
    `${process.env.REACT_APP_API}/post/list/tag?page=${page}&size=${size}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tag: tag,
        blogId: process.env.REACT_APP_BLOG_ID,
      }),
    }
  );

  const res = await result.json();

  console.log("LoadTagPostListFunction result: %o", res);

  return res;
}
