import type { Page } from "@/interfaces/page";
import { fetchSettings } from "./cms";

export async function isHomePage(page: Page): Promise<boolean> {
    const settings = await fetchSettings();
    if (!settings) return false;
    return page.id === settings.identityGroup.homepage.id;
}