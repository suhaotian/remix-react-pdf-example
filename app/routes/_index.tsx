import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import type { MetaFunction } from "@remix-run/node";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useSize } from "ahooks";
import { useRef, useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs-dist/build/pdf.worker.min.js";

export const meta: MetaFunction = () => {
  return [
    { title: "Your guide to IELTS" },
    { name: "description", content: "Open up a world of opportunity" },
  ];
};

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};
const maxWidth = 800;

export default function Index() {
  const file = "/ielts/your-guide-to-IELTS.pdf";
  const [numPages, setNumPages] = useState<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  const size = useSize(containerRef);
  const width = Math.min(size?.width || Infinity, maxWidth);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }
  return (
    <div ref={containerRef}>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={width}
          />
        ))}
      </Document>
    </div>
  );
}
