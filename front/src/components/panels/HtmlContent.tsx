import { HTMLContentProps } from '@/interfaces/blocks';
import React from 'react';

const HtmlContent: React.FC<HTMLContentProps> = (content: HTMLContentProps) => {
    return(
        <>
        <div dangerouslySetInnerHTML={{ __html: content.content }}></div>
        </>
    )
}

export default HtmlContent;