import EncryptFunction from "../../Utils/Function/EncryptFunction";

export default async function SignUpFunction({ name, email, password }) {
  const encryptedEmail = EncryptFunction({ data: email });
  const encryptedPassword = EncryptFunction({ data: password });
  const encryptedName = EncryptFunction({ data: name });

  const userData = {
    name: encryptedName,
    email: encryptedEmail,
    password: encryptedPassword,
    blogId: process.env.REACT_APP_BLOG_ID,
  };

  const result = await fetch(`${process.env.REACT_APP_API}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const res = await result.json();

  // console.log("SignUpFunction result: %o", res);

  return res;
}
