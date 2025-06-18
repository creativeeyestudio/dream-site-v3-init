import { test, expect } from '@playwright/test';

test('API Payload retourne des posts', async ({ request }) => {
    const res = await request.get('http://localhost:3001/api/pages?limit=1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.docs)).toBe(true);
});
