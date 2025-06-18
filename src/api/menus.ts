import connectToCMS from "./connectToCMS";

const token = process.env.API_TOKEN;
const baseUrl = process.env.API_URL;

if (!token || !baseUrl) {
  console.error("API token or base URL is missing");
}

async function getMenu(menuId: string, locale: string) {
  const data = connectToCMS(`navigation?where[menuId][equals]=${menuId}&locale=${locale}`);
  return data ?? null;
}

export default getMenu;
