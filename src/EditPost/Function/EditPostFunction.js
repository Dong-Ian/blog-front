export default async function EditPostFunction({
  token,
  postTitle,
  postContents,
  isPinned,
}) {
  console.log(postTitle);
  const result = await fetch(`${process.env.REACT_APP_API}/admin/post/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      postTitle: postTitle,
      postContents: postContents,

      isPinned: isPinned,
    }),
  });

  const res = await result.json();

  console.log("EditPostFunction result: %o", res);

  return res;
}
