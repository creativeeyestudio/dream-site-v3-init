import { getHomePage } from "@/api/pages";
import { notFound } from "next/navigation";
import { PageContentProps } from "@/interfaces/page";
import ContentPageItems from "@/components/layout/ContentPageItems";
import { Metadata } from "next";
import { headers } from "next/headers";

export type PageHomeParams = Promise<{
  locale: string;
}>;

export default async function HomePage(props: { params: PageHomeParams }) {
  const params = await props.params;

  const page: PageContentProps = await getHomePage(params.locale);

  return page ? <ContentPageItems blocks={page.content.layout} /> : notFound();
}

// SEO dynamique
export async function generateMetadata(props: {
  params: PageHomeParams;
}): Promise<Metadata> {
  const reqHeaders = await headers();
  const params = await props.params;
  const page: PageContentProps | null = await getHomePage(params.locale);

  if (!page) {
    return {
      title: "Page introuvable",
    };
  }

  return {
    title: `≻ ${page.meta.title ?? page.title}`,
    description: page.meta.description ?? "",
    generator: "Dreamsite V3",
    authors: [{ name: "Kévin RIFA", url: "https://creative-eye.fr" }],
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: reqHeaders.get("referer") || "",
      type: `website`,
    },
    twitter: {
      card: "summary_large_image",
      title: page.meta.title,
      description: page.meta.description,
    },
  };
}
