import { Metadata } from "next";
import {fetchHomePage} from "@/lib/cms";
import ContentPageItems from "@/components/layout/ContentPageItems";
import { notFound } from "next/navigation";
import { headers } from 'next/headers';

export type PageHomeParams = Promise<{
  locale: string;
}>;

/* --------------------------------------------------
   SEO dynamique
-------------------------------------------------- */
export async function generateMetadata(props: { params: PageHomeParams }): Promise<Metadata> {
  const { locale } = await props.params;
  const headersList = await headers();
  const site = headersList.get('x-website') ?? 'default-site';
  const page = await fetchHomePage(site, locale);

  if (!page) return { title: 'Page introuvable' };

  const { title, description } = page.meta;
  const fullTitle = `${title ?? page.title}`;

  return {
    title       : fullTitle,
    description : description ?? '',
  };
}

/* --------------------------------------------------
   Rendu de la page
-------------------------------------------------- */
export default async function HomePage(props: { params: PageHomeParams }) {
  const { locale } = await props.params;
  const headersList = await headers();
  const site = headersList.get('x-website') ?? 'default-site';
  const page = await fetchHomePage(site, locale);

  if (!page) return notFound();

  return <ContentPageItems blocks={page.content.layout} />;
}