import React from 'react';
import Navigation from './Navigation';

interface HeaderProps {
    locale: string
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
    return(
        <>
            <header></header>
            <div className="nav--primary">
                <Navigation menuId={'main-navigation'} locale={locale} images={true} classes={undefined} />
            </div>
        </>
    );
}

export default Header;