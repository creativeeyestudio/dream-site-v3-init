export default async function connectToPayloadCMS() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: process.env.NEXT_PUBLIC_API_USER,
        password: process.env.API_PASSWORD,
      }),
    },
  );

  if (!res.ok) throw new Error("Error during connect to Payload CMS");

  const { token } = await res.json();

  return token;
}
