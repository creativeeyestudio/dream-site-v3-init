import { getPage } from "@/api/pages";
import ContentPageItems from "@/components/layout/ContentPageItems";
import { PageProps } from "@/interfaces/page";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

export type PageParams = Promise<{
  locale: string;
  slug: string;
}>;

export default async function WebPage(props: { params: PageParams }) {
  const params = await props.params;
  const page: PageProps | null = await getPage(params.locale, params.slug);

  const doc = page?.docs[0];

  if (!page) notFound();

  if (doc?.config.homepage) redirect(`/${params.locale}`);

  return doc ? <ContentPageItems blocks={doc.content.layout} /> : notFound();
}

// SEO dynamique
export async function generateMetadata(props: {
  params: PageParams;
}): Promise<Metadata> {
  const reqHeaders = await headers();
  const params = await props.params;
  const page: PageProps | null = await getPage(params.locale, params.slug);
  const doc = page?.docs[0];

  if (!page) {
    return {
      title: "Page introuvable",
    };
  }

  return {
    title: `${doc?.meta.title ?? doc?.title} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: doc?.meta.description ?? "",
    generator: "Dreamsite V3",
    authors: [{ name: "Kévin RIFA", url: "https://creative-eye.fr" }],
    openGraph: {
      title: doc?.meta.title,
      description: doc?.meta.description,
      url: reqHeaders.get("referer") || "",
      type: `website`,
    },
    twitter: {
      card: "summary_large_image",
      title: doc?.meta.title,
      description: doc?.meta.description,
    },
  };
}
