"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface ToggleLangProps {
  currentLocale: string;
}

const ToggleLang: React.FC<ToggleLangProps> = ({ currentLocale }) => {
  const router = useRouter();
  const pathname = usePathname();

  const locales = ["en", "fr", "es"];

  const handleLocaleChange = (targetLocale: string) => {
    if (targetLocale === currentLocale) return;

    const segments = pathname.split("/");
    segments[1] = targetLocale;
    const newPath = segments.join("/");

    router.push(newPath);
  };

  return (
    <ul>
      {locales.map((locale) => (
        <li key={locale}>
          <button
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            disabled={locale === currentLocale}
          >
            {locale.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ToggleLang;
