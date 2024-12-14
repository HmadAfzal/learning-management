import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText } from "lucide-react";

const AccordionSections = ({ sections }: AccordionSectionsProps) => {
  return (
    <Accordion type="multiple" className="w-full">
      {sections.map((section) => (
        <AccordionItem
          key={section.sectionId}
          value={section.sectionTitle}
          className="border-x border-b border-zinc-600 overflow-hidden first:border-t first:rounded-t-lg last:rounded-b-lg"
        >
          <AccordionTrigger className="hover:bg-zinc-700/50 bg-customgreys-primarybg/50 px-4 py-3">
            <h5 className="text-zinc-400 font-medium">{section.sectionTitle}</h5>
          </AccordionTrigger>
          <AccordionContent className="bg-customgreys-secondarybg/50 px-4 py-4">
            <ul>
              {section.chapters.map((chapter) => (
                <li
                  key={chapter.chapterId}
                  className="flex items-center text-zinc-400/90 py-1"
                >
                  <FileText className="mr-2 w-4 h-4" />
                  <span className="text-sm">{chapter.title}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionSections;