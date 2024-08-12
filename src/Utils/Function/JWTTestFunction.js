export default async function JWTTestFunction({ token }) {
  const result = await fetch(`${process.env.REACT_APP_API}/api`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await result.json();

  return res;
}
