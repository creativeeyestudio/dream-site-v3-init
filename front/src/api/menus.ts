const token = process.env.NEXT_PUBLIC_API_TOKEN;
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!token || !baseUrl) {
    console.error(`Token : ${token}`);
    console.error(`Base URL : ${baseUrl}`);
    throw new Error("API token is missing");
}

async function getMenu(menuId: string, locale: string) {
    const res = await fetch(`${baseUrl}/api/navigation/render/${menuId}?type=TREE&locale=${locale}`, {
        headers: {
			Authorization: `Bearer ${token}`,
		},
    })

    if (!res.ok) throw new Error(`API : Le menu ${menuId} n'a pas pu être chargé`);
    
    const json = await res.json();
    
	return json;
}

export default getMenu;