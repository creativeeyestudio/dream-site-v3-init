import { Accordion, AccordionItem, SelectionMode } from "@heroui/react";
import React from "react";

export interface AccordionListProps {
  items: string[];
  multiple: SelectionMode
}

const AccordionList: React.FC<AccordionListProps> = ({ items, multiple = 'none' }) => {
  return (
    <Accordion selectionMode={ multiple }>
      {items.map((item: string, index: number) => (
        <AccordionItem 
            key={index} 
            aria-label="" 
            title=""
            subtitle="">
              {item}
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default AccordionList