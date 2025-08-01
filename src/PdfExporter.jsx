// PdfExporter.jsx
import React from "react";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons"; 


export default function PdfExporter({ targetRef }) {
  const handlePrint = async () => {
    const input = targetRef.current;

    const canvas = await html2canvas(input, { scale: 2 });
    const dataUrl = canvas.toDataURL("image/png");

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Preview</title>
            <style>
              @media print {
                body {
                  margin: 0;
                }
                img {
                  width: 210mm;
                  height: auto;
                }
              }
              body {
                text-align: center;
                margin: 0;
              }
              img {
                width: 210mm;
                margin: 0 auto;
              }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" onload="window.print();window.close()" />
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    
    <button onClick={handlePrint}>
      <FontAwesomeIcon icon={faPrint} style={{ marginRight: "6px" }} /> Print PDF
    </button>
  );
}
