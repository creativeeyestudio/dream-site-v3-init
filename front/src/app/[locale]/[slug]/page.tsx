import { getPage } from "@/api/pages";
import ContentPageItems from "@/components/layout/ContentPageItems";
import { PageContentProps } from "@/interfaces/page";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

export type PageParams = Promise<{
  locale: string;
  slug: string;
}>;

export default async function WebPage(props: { params: PageParams }) {
  const params = await props.params;
  const page: PageContentProps | null = await getPage(
    params.locale,
    params.slug,
  );

  if (!page) notFound();

  if (page.config.homepage) redirect(`/${params.locale}`);

  return <ContentPageItems blocks={page.content.layout} />;
}

// SEO dynamique
export async function generateMetadata(props: {
  params: PageParams;
}): Promise<Metadata> {
  const reqHeaders = await headers();
  const params = await props.params;
  const page: PageContentProps | null = await getPage(
    params.locale,
    params.slug,
  );

  if (!page) {
    return {
      title: "Page introuvable",
    };
  }

  return {
    title: `${page.meta.title ?? page.title} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
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
