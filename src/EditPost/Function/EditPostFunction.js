export default async function EditPostFunction({
  token,
  postSeq,
  postTitle,
  postContents,
  isPinned,
  tags,
}) {
  console.log("postTitle: %o, postContents: %o", postTitle, postContents);

  const result = await fetch(`${process.env.REACT_APP_API}/admin/post/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      postSeq: postSeq,
      postTitle: postTitle,
      postContents: postContents,
      isPinned: isPinned,
      tags: tags,
    }),
  });

  const res = await result.json();

  // console.log("EditPostFunction result: %o", res);

  return res;
}
