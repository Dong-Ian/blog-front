export default async function DeletePostFunction({ token, postSeq }) {
  const result = await fetch(`${process.env.REACT_APP_API}/admin/post/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      postSeq: postSeq,
    }),
  });

  const res = await result.json();

  return res;
}
