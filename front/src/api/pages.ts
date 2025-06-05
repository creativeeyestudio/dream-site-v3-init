export async function getHomePage(locale: string) {
  	return initPage(locale, '[homepage][$eq]=true');
}

export async function getPage(locale: string, slug: string) {
	return initPage(locale, `[slug][$eq]=${slug}`);
}

async function initPage(locale: string, slug: string) {
	const token = process.env.NEXT_PUBLIC_API_TOKEN;
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	
	if (!token || !baseUrl) {
		console.error(`Token : ${token}`);
		console.error(`Base URL : ${baseUrl}`);
		throw new Error("API Credentials are missings")
	};

	const res = await fetch(`${baseUrl}/api/pages?pLevel&locale=${locale}&filters${slug}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		next: { revalidate: 60 },
	});

	if (!res.ok) throw new Error(`API : La page n'a pas pu être trouvée`);

	const json = await res.json();
	return json.data[0];
}