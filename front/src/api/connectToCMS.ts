// lib/connectToCMS.ts

type LoginResponse = {
  user: {
    email: string;
    id: string;
  };
  token: string;
};

export default async function connectToCMS(path: string): Promise<any> {
  const loginRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: process.env.NEXT_PUBLIC_API_USER,
      password: process.env.API_PASSWORD,
    }),
  });

  if (!loginRes.ok) {
    throw new Error('Erreur lors de la connexion au CMS');
  }

  const loginData: LoginResponse = await loginRes.json();

  const dataRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${path}`, {
    headers: {
      Authorization: `JWT ${loginData.token}`,
    },
  });

  if (!dataRes.ok) {
    throw new Error('Erreur lors de la récupération des données CMS');
  }

  const data = await dataRes.json();
  return data.docs[0];
}
