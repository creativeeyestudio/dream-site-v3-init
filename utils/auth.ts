const PAYLOAD_URL = process.env.PAYLOAD_API_URL ?? 'http://localhost:3001/api';
const ADMIN_EMAIL = process.env.PAYLOAD_ADMIN_EMAIL ?? 'admin@example.com';
const ADMIN_PASSWORD = process.env.PAYLOAD_ADMIN_PASSWORD ?? 'admin';

export async function getAdminToken(): Promise<string> {
    const res = await fetch(`${PAYLOAD_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
        }),
    });

    if (!res.ok) {
        throw new Error(`Login failed → ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();
    if (!data.token) throw new Error('No token returned');
    return data.token;
}
