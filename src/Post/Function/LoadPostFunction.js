export default async function LoadPostFunctioin({ postSeq }) {
  const result = await fetch(`${process.env.REACT_APP_API}/post/contents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postSeq: postSeq,
    }),
  });

  const res = await result.json();

  console.log("LoadPostFunction result: %o", res);

  return res;
}
