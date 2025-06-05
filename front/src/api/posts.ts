import axios from "axios";

const token = process.env.NEXT_PUBLIC_API_TOKEN;
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!token || !baseUrl) {
  console.error(`Token : ${token}`);
  console.error(`Base URL : ${baseUrl}`);
  throw new Error("API Credentials are missings")
};

const api = axios.create({
  baseURL: `${baseUrl}/api`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const handleError = (error: unknown, context = 'request') => {
  console.error(`Error during ${context}:`, error);
  throw new Error(`Failed to ${context}: ${error instanceof Error ? error.message : 'Unknown error'}`);
};

export async function getAllPosts(): Promise<unknown> {
  try {
    const { data } = await api.get('/posts/?populate=deep');
    return data;
  } catch (error) {
    handleError(error, 'fetch all posts');
  }
}

export async function getSinglePost(slug: string | string[] | undefined): Promise<unknown> {
  if (!slug || (Array.isArray(slug) && slug.length === 0)) throw new Error('Slug is required');

  const formattedSlug = Array.isArray(slug) ? slug[0] : slug;

  try {
    const { data } = await api.get(`/posts/?populate=deep&filters[slug][$eq]=${formattedSlug}`);
    return data;
  } catch (error) {
    handleError(error, 'fetch single post');
  }
}
