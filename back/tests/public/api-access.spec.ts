import { test, expect, request } from '@playwright/test';

test('Public API - get posts', async () => {
  const response = await request.newContext().then(ctx => ctx.get('http://localhost:3000/api/posts'));
  expect(response.ok()).toBeTruthy();

  const posts = await response.json();
  expect(Array.isArray(posts.docs)).toBe(true);
});
