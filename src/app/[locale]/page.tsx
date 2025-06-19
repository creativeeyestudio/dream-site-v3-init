import { getHomePage } from "@/api/pages";
import { notFound } from "next/navigation";
import { PageProps } from "@/interfaces/page";
import ContentPageItems from "@/components/layout/ContentPageItems";
import { Metadata } from "next";
import { headers } from "next/headers";

export type PageHomeParams = Promise<{
  locale: string;
}>;

export default async function HomePage(props: { params: PageHomeParams }) {
  const params = await props.params;

  const page: PageProps = await getHomePage(params.locale);
  const doc = page.docs?.[0];

  return doc ? <ContentPageItems blocks={doc.content.layout} /> : notFound();
}

// SEO dynamique
export async function generateMetadata(props: {
  params: PageHomeParams;
}): Promise<Metadata> {
  const reqHeaders = await headers();
  const params = await props.params;
  const page: PageProps | null = await getHomePage(params.locale);
  const doc = page?.docs?.[0];

  if (!doc) {
    return {
      title: "Page introuvable",
    };
  }

  return {
    title: `≻ ${doc.meta.title ?? doc.title}`,
    description: doc.meta.description ?? "",
    generator: "Dreamsite V3",
    authors: [{ name: "Kévin RIFA", url: "https://creative-eye.fr" }],
    openGraph: {
      title: doc.meta.title,
      description: doc.meta.description,
      url: reqHeaders.get("referer") || "",
      type: `website`,
    },
    twitter: {
      card: "summary_large_image",
      title: doc.meta.title,
      description: doc.meta.description,
    },
  };
}
