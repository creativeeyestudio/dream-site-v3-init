import { PageContentProps } from "./page";

export interface Menu {
  createdAt: string | Date;
  updatedAt: string | Date;
  menuId: 'main-menu' | 'secondary-menu' | 'footer-menu';
  items: MenuItem[];
  id: string;
}

export interface MenuItem {
  type: 'page' | 'post' | 'external';
  page?: PageContentProps;
  label?: string;
  url?: string;
  newTab?: boolean;
  children: MenuItem[];
  id: string;
}