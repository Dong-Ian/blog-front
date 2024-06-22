export default async function LoadAccountFunction() {
  const result = await fetch(`${process.env.REACT_APP_API}/user/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await result.json();

  console.log("LoadAccountFunction result: %o", res);

  return res;
}
