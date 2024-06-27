export default async function EditBackgroundImgFunction({ token, formData }) {
  const result = await fetch(
    `${process.env.REACT_APP_API}/admin/upload/image/background`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      redirect: "follow",
    }
  );

  const res = await result.json();

  // console.log("EditBackgroundImgFunction result: %o", res);

  return;
}
