import connectToPayloadCMS from "./connectToPayloadCMS";

async function getMenu(menuId: string, locale: string) {
  const token = await connectToPayloadCMS();

  const apiSlug = `${encodeURIComponent(menuId)}?locale=${locale}`;

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/navigation/${apiSlug}`,
    {
      headers: { Authorization: `JWT ${token}` },
    },
  );

  if (!data.ok) throw new Error(`Error during loading ${menuId}`);

  const menu = await data.json();
  return menu;
}

export default getMenu;
