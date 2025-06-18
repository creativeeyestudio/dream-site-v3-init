import { getAdminToken } from './auth';

const API_URL = process.env.PAYLOAD_API_URL ?? 'http://localhost:3001/api';

type Post = { title: string; slug: string };

export async function createPage(post: Post) {
    const token = await getAdminToken();

    const res = await fetch(`${API_URL}/pages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(post),
    });

    if (!res.ok) {
        throw new Error(`Create post failed → ${res.status}: ${await res.text()}`);
    }
}

export async function deletePage(slug: string) {
    const token = await getAdminToken();

    const list = await fetch(`${API_URL}/page?where[slug][equals]=${slug}`, {
        headers: { Authorization: `JWT ${token}` },
    }).then(r => r.json());

    const id = list?.docs?.[0]?.id;
    if (!id) return;

    await fetch(`${API_URL}/pages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `JWT ${token}` },
    });
}
