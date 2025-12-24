import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PDFViewer = ({ fileUrl }) => (
  <div style={{ height: '750px', borderRadius: '8px', overflow: 'auto', border: '1px solid #222' ,}}>
    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
      {fileUrl ? <Viewer fileUrl={fileUrl} /> : <div className="text-center text-muted pt-5">No PDF loaded</div>}
    </Worker>
  </div>
);

export default PDFViewer;
