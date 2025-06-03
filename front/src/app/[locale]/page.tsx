import { getHomePage } from "@/api/pages";
import { notFound } from "next/navigation";
import { PageContentProps } from "@/interfaces/page";
import ContentPageItems from "@/components/layout/ContentPageItems";
import { Metadata } from "next";
import { headers } from "next/headers";

export type PageHomeParams = Promise<{
    locale: string;
}>;

export default async function HomePage(props: { params : PageHomeParams}) {
	const params = await props.params

    const page: PageContentProps = await getHomePage(params.locale);
    
    return page
        ? <ContentPageItems blocks={page.content_page} /> 
        : notFound();
}

// SEO dynamique
export async function generateMetadata(props: { params : PageHomeParams}): Promise<Metadata> {
	const reqHeaders = await headers();
	const params = await props.params;
	const page: PageContentProps | null = await getHomePage(params.locale);

	if (!page) {
		return {
			title: "Page introuvable",
		};
	}

	return {
		title: `≻ ${page.seo?.meta_title ?? page.title}`,
		description: page.seo?.meta_desc ?? '',
		generator: "Dreamsite V3",
		authors: [{ name: "Kévin RIFA", url: 'https://creative-eye.fr'}],
		openGraph: {
			title: page.seo?.og_title,
			description: page.seo?.og_desc,
			images: [
				{
					url: page.seo?.social_image?.url || "",
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