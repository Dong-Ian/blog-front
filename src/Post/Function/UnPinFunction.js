export default async function UnPinFunction({ token, postSeq }) {
  const result = await fetch(
    `${process.env.REACT_APP_API}/admin/post/update/unpin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postSeq: postSeq,
        blogId: process.env.REACT_APP_BLOG_ID,
      }),
    }
  );

  const res = await result.json();

  console.log("UnPinFunction result: %o", res);

  return res;
}
