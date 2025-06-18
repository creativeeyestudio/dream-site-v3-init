import connectToCMS from "./connectToCMS";

export async function getHomePage(locale: string) {
  return initPage(locale);
}

export async function getPage(locale: string, slug: string) {
  return initPage(locale, slug);
}

function initPage(locale: string, slug: string | null = null) {
  return slug
    ? connectToCMS(`pages?where[slug][equals]=${slug}&locale=${locale}`)
    : connectToCMS(
        `pages?where[config.homepage][equals]=true&locale=${locale}`,
      );
}
