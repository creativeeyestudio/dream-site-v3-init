import { NavigationProps } from "@/interfaces/navigation";
import {Page} from "@/interfaces/page";
import {SettingsProps} from "@/interfaces/settings";

/* ------------------------------------------------------------------
   Constantes
------------------------------------------------------------------ */
const SETTINGS_ID = process.env.SITE_ID!;
const CMS_URL = process.env.API_URL!;

/* --------------------------------------------------
   Settings
-------------------------------------------------- */
let cachedSettings: SettingsProps | null = null;

export async function fetchSettings(): Promise<SettingsProps | null> {
    if (cachedSettings) return cachedSettings;
    
    const res = await fetch(`${CMS_URL}/api/settings/${SETTINGS_ID}`);

    if (!res.ok) return null;
    
    cachedSettings = await res.json() as SettingsProps;
    return cachedSettings;
}

/* --------------------------------------------------
   Pages
-------------------------------------------------- */
/**
 * @param site 
 * @param locale 
 * @returns 
 */
export async function fetchHomePage(site: string, locale: string) {
    const settings = await fetchSettings();
    if (!settings) return null;

    const res = await fetch(`${CMS_URL}/api/pages/${settings.identityGroup?.homepage.id}?depth=2&locale=${locale}`, {
        headers: { 'x-website': site },
        next: { revalidate: 0 },
    })

    if (!res.ok) return null;
    return res.json();
}

/**
 * @param site 
 * @param slug 
 * @param locale 
 * @returns 
 */
export async function fetchPage(site: string, slug: string, locale: string): Promise<Page | null> {
    const res = await fetch(`${CMS_URL}/api/pages?where[slug][equals]=${slug}&depth=2&locale=${locale}`, {
        headers: { 'x-website': site },
        next: { revalidate: 0 },
    })

    if (!res.ok) return null;

    const { docs } = await res.json() as { docs: Page[] };
    return docs?.[0] ?? null;
}

/* --------------------------------------------------
   Navigation
-------------------------------------------------- */
/**
 * @param site 
 * @param menuId 
 * @param locale 
 * @returns 
 */
export async function fetchNavigation(site: string, menuId: string, locale: string): Promise<NavigationProps | null> {
    const res = await fetch(`${CMS_URL}/api/navigation?where[menuId][equals]=${menuId}&depth=2&locale=${locale}`, {
        headers: { 'x-website': site },
        next: { revalidate: 0 },
    })

    if (!res.ok) return null;

    const { docs } = await res.json() as { docs: NavigationProps[] };
    return docs?.[0] ?? null;
}