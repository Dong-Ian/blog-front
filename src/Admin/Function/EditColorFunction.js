export default async function EditColorFunction({ token, color }) {
  const result = await fetch(
    `${process.env.REACT_APP_API}/admin/user/profile/color`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        color: color.background,
      }),
    }
  );

  const res = await result.json();

  return res;
}
