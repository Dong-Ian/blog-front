export default async function PinFunction({ token, postSeq }) {
  const result = await fetch(
    `${process.env.REACT_APP_API}/admin/post/update/pin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postSeq: postSeq,
      }),
    }
  );

  const res = await result.json();

  console.log("PinFunction result: %o", res);

  return res;
}
