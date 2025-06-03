import getMenu from '@/api/menus';
import { MenuItem } from '@/interfaces/menu';
import Link from 'next/link';
import React from 'react';

interface NavigationProps {
    menuId: string
    locale: string
    images: boolean
    classes: string | undefined
}

const Navigation = async ({ menuId, locale }: NavigationProps) => {
    
    const menu = await getMenu(menuId, locale);

    const renderLink = (item: MenuItem) => {
        const isExternal = item.additionalFields.external;
        const isExternalType = item.type === 'EXTERNAL';
        const href = isExternalType ? item.path : `/${locale}${item.path}`;
        const target = isExternal ? '_blank' : undefined;
        const rel = isExternal ? 'noopener noreferrer' : undefined;

        return isExternalType ? (
            <a href={href} target={target} rel={rel}>
                {item.title}
            </a>
        ) : (
            <Link href={{ pathname: href }} target={target} rel={rel}>
                {item.title}
            </Link>
        );
    };

    
return (
  <ul>
    {menu.map((item: MenuItem) => {
        const hasChildren = item.items && item.items.length > 0;

        return (
            <li key={item.id}>
                {renderLink(item)}

                {hasChildren && (
                    <ul>
                    {item.items!.map((subItem) => (
                        <li key={subItem.id}>{renderLink(subItem)}</li>
                    ))}
                    </ul>
                )}
            </li>
        );
    })}
  </ul>
);

};
  
export default Navigation;