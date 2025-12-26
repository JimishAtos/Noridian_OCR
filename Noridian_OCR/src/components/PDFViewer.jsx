import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

// selectedField: { page, x, y, width, height } (all in percent or absolute units relative to PDF page)
const PDFViewer = ({ fileUrl, selectedField }) => {
  // Overlay plugin using the slot API
  const renderPageLayer = (props) => {
    // Only render overlay on the correct page
    if (
      !selectedField ||
      selectedField.page == null ||
      selectedField.page !== props.pageIndex + 1 ||
      selectedField.x == null ||
      selectedField.y == null ||
      selectedField.width == null ||
      selectedField.height == null
    ) {
      return null;
    }
    // Get rendered page size
    const { width: pageWidth, height: pageHeight } = props.canvasLayerRenderedSize || {};
    // Helper to parse percent or pixel value
    const parseCoord = (val, total) => {
      if (typeof val === 'string' && val.trim().endsWith('%')) {
        return (parseFloat(val) / 100) * total;
      }
      return Number(val);
    };
    const left = pageWidth ? parseCoord(selectedField.x, pageWidth) : selectedField.x;
    const top = pageHeight ? parseCoord(selectedField.y, pageHeight) : selectedField.y;
    const width = pageWidth ? parseCoord(selectedField.width, pageWidth) : selectedField.width;
    const height = pageHeight ? parseCoord(selectedField.height, pageHeight) : selectedField.height;
    return (
      <div
        style={{
          position: 'absolute',
          left,
          top,
          width,
          height,
          border: '2px solid green',
          boxSizing: 'border-box',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
    );
  };

  return (
    <div className="isPdfViewer" style={{ position: 'relative' }}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
        {fileUrl ? (
          <Viewer
            fileUrl={fileUrl}
            renderPageLayer={renderPageLayer}
          />
        ) : (
          <div className="text-center text-muted pt-5">No PDF loaded</div>
        )}
      </Worker>
    </div>
  );
};

export default PDFViewer;
