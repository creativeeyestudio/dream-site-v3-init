import getMenu from "@/api/menus";
import { MenuItem } from "@/interfaces/menu";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NavigationProps {
  menuId?: string | null;
  locale: string;
  classes?: string;
}

const Navigation = async ({
  menuId = null,
  locale,
  classes,
}: NavigationProps) => {
  if (menuId == null || menuId == "") return;

  const menu = await getMenu(menuId, locale);

  if (!menu) {
    console.error(`Menu non trouvé avec l'ID ${menuId}`);
    return;
  }

  const getLinkProps = (item: MenuItem) => {
    const href = item.page ? `/${locale}/${item.page.slug}` : (item.url ?? "#");
    const label = item.page?.title ?? item.label ?? "";
    return { href, label };
  };

  const renderLink = (item: MenuItem) => {
    const { href, label } = getLinkProps(item);

    return item.type === "external" ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title="Nouvel onglet"
      >
        {label}
      </a>
    ) : (
      <Link href={href}>{label}</Link>
    );
  };

  const renderItems = (items: MenuItem[]) => (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {renderLink(item)}
          {item.children?.length ? renderItems(item.children) : null}
        </li>
      ))}
    </ul>
  );

  const renderImages = (items: MenuItem[]) => (
   <div>
      {items.map((item) =>
        item.image ? (
          <Image
            key={item.id}
            src={item.image.url}
            alt={item.image.alt ?? ""}
            fill
          />
        ) : null,
      )}
    </div>
  );

  return (
    <>
      <nav className={classes}>{renderItems(menu.items)}</nav>
      <div>{renderImages(menu.items)}</div>
    </>
  );
};

export default Navigation;
