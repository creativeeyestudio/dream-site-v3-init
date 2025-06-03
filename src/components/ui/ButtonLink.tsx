import Link from "next/link";
import React from "react";

interface ButtonLink {
    label: string
    link: string
    isBlank: boolean
}

const ButtonLink: React.FC<ButtonLink> = ({ label, link, isBlank = false }) => {
    return(
        <Link href={link} target={isBlank ? '_blank' : ''}>
            {label}
        </Link>
    )
}

export default ButtonLink;