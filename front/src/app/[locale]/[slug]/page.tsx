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

export default async function WebPage(props: { params : PageParams}) {
	const params = await props.params
	const page: PageContentProps | null = await getPage(params.locale, params.slug);

	if (!page) notFound();

	if (page.homepage) redirect(`/${params.locale}`);

	return <ContentPageItems blocks={page.content_page} />;
}

// SEO dynamique
export async function generateMetadata(props: { params : PageParams}): Promise<Metadata> {
	const reqHeaders = await headers();
	const params = await props.params
	const page: PageContentProps | null = await getPage(params.locale, params.slug);

	if (!page) {
		return {
			title: "Page introuvable",
		};
	}

	return {
		title: `${page.seo?.meta_title ?? page.title} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
		description: page.seo?.meta_desc ?? '',
		generator: "Dreamsite V3",
		authors: [{ name: "Kévin RIFA", url: 'https://creative-eye.fr'}],
		openGraph: {
			title: page.seo?.og_title,
			description: page.seo?.og_desc,
			images: [
				{
					url: page.seo?.social_image?.url || '',
					width: page.seo?.social_image?.width,
					height: page.seo?.social_image?.height
				}
			],
			url: reqHeaders.get('referer') || '',
			type: `website`,
		},
		twitter: {
			card: 'summary_large_image',
			title: page.seo?.twitter_title,
			description: page.seo?.twitter_desc,
			images: page.seo?.twitter_image?.url
		}
	};
}
