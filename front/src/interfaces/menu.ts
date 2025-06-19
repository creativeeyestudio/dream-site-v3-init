import { ImageDataProps } from "./image";
import { PageDoc } from "./page";

export interface Menu {
  createdAt: string | Date;
  updatedAt: string | Date;
  menuId: "main-menu" | "secondary-menu" | "footer-menu";
  items: MenuItem[];
  id: string;
}

export interface MenuItem {
  type: "page" | "post" | "external";
  page?: PageDoc;
  label?: string;
  url?: string;
  newTab?: boolean;
  children: MenuItem[];
  id: string;
  image: ImageDataProps;
}
