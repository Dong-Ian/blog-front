export default async function PostingFunction({
  token,
  postTitle,
  postContents,
  imageSeqs,
  tags,
  category,
  isPinned,
}) {
  const result = await fetch(
    `${process.env.REACT_APP_API}/admin/post/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postTitle: postTitle,
        postContents: postContents,
        imageSeqs: imageSeqs,
        tags: tags,
        category: category,
        isPinned: isPinned,
      }),
    }
  );

  const res = await result.json();

  return res;
}
