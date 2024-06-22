export default async function LoadPostListFunction({ page, size }) {
  const result = await fetch(
    `${process.env.REACT_APP_API}/post/list?page=${page}&size=${size}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const res = await result.json();

  console.log("LoadPostListFunction result: %o", res);

  return res;
}
