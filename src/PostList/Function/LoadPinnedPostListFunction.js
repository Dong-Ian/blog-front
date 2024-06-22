export default async function LoadPinnedPostListFunction({ page, size }) {
  const result = await fetch(
    `${process.env.REACT_APP_API}/post/list/pinned?page=${page}&size=${size}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const res = await result.json();

  console.log("LoadPinnedPostListFunction result: %o", res);

  return res;
}
