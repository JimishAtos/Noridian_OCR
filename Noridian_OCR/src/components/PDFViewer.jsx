import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { createPortal } from 'react-dom';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PDFViewer = ({ fileUrl, highlightBoxes }) => {
  const containerRef = React.useRef(null);
  const [overlays, setOverlays] = React.useState([]);

  // Scroll to PDF page when table clicks
  React.useEffect(() => {
    const handler = (e) => {
      const { page } = e.detail;

      const pages = containerRef.current?.querySelectorAll(
        '.rpv-core__page-layer'
      );

      if (!pages || !pages[page - 1]) return;

      pages[page - 1].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    };

    window.addEventListener('scrollToPdfPage', handler);
    return () => window.removeEventListener('scrollToPdfPage', handler);
  }, []);

  // Build overlays whenever highlights change
  React.useEffect(() => {
    if (!containerRef.current || !highlightBoxes || highlightBoxes.length === 0) {
      setOverlays([]);
      return;
    }

    const pages = containerRef.current.querySelectorAll('.rpv-core__page-layer');
    if (!pages || pages.length === 0) return;

    const next = [];

    highlightBoxes.forEach((box, i) => {
      const pageEl = pages[box.page - 1];
      if (!pageEl) return;

      const rect = pageEl.getBoundingClientRect();

      // --- CMS-1500 margin tuning ---
      const marginX = rect.width * 0.025;
      const marginY = rect.height * 0.015;

      const contentWidth = rect.width - marginX * 2;
      const contentHeight = rect.height - marginY * 2;
      const fineTuneY = rect.height * 0.01;

      next.push({
        id: i,
        pageEl,
        style: {
          left: `${marginX + box.x * contentWidth}px`,
          top: `${marginY + box.y * contentHeight - fineTuneY}px`,
          width: `${box.width * contentWidth}px`,
          height: `${box.height * contentHeight}px`,
        },
      });
    });

    setOverlays(next);
  }, [highlightBoxes]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '75vh',
        overflow: 'auto',
        position: 'relative',
      }}
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        {fileUrl ? (
          <Viewer fileUrl={fileUrl} />
        ) : (
          <div className="text-center text-muted pt-5">
            No PDF loaded
          </div>
        )}
      </Worker>

      {/* Render overlays inside each PDF page using portals */}
      {overlays.map((o) =>
        o.pageEl
          ? createPortal(
            <div
              key={o.id}
              className="highlight-box"
              style={o.style}
            />,
            o.pageEl
          )
          : null
      )}
    </div>
  );
};

export default PDFViewer;