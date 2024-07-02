export default async function EditPostFunction({
  token,
  postSeq,
  postTitle,
  postContents,
  isPinned,
  tags,
  category,
}) {
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
      category: category,
    }),
  });

  const res = await result.json();

  // console.log("EditPostFunction result: %o", res);

  return res;
}
