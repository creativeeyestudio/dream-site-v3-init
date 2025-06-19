import { notFound } from "next/navigation";
import connectToPayloadCMS from "./connectToPayloadCMS";

export async function getHomePage(locale: string) {
  return initPage(locale);
}

export async function getPage(locale: string, slug: string) {
  return initPage(locale, slug);
}

async function initPage(locale: string, slug: string | null = null) {
  const token = await connectToPayloadCMS();

  const apiSlug = slug
    ? `?where[slug][equals]=${slug}&locale=${locale}`
    : `?where[config.homepage][equals]=true&locale=${locale}`;

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/pages${apiSlug}`,
    {
      headers: { Authorization: `JWT ${token}` },
    },
  );

  if (!data.ok) {
    console.error(
      `Page not found with url : ${process.env.NEXT_PUBLIC_API_URL}/api/pages${apiSlug}`,
    );
    notFound();
  }

  const page = await data.json();
  return page;
}
