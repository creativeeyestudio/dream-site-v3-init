import React from "react";
import Navigation from "./Navigation";

interface HeaderProps {
  locale: string;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
  return (
    <>
      <header></header>
      <div className="nav--primary">
        <Navigation
          menuId={process.env.MAIN_MENU}
          locale={locale}
          classes={undefined}
        />
      </div>
    </>
  );
};

export default Header;
