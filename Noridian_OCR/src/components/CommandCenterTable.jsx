import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PDFViewer from './PDFViewer';

// Convert backend fields object → table rows
function parseExtractedFields(fieldsObj) {
  if (!fieldsObj) return [];
  return Object.entries(fieldsObj).map(([key, val]) => ({
    label: key.replace(/_/g, ' '),
    value: val.value,
    source: val.source,
    confidence: val.confidence,
    comments: '',
  }));
}

// Parse Azure D(...) polygons
export function parseAzureSource(source) {
  if (!source) return [];

  return source.split(";")
    .map(segment => {
      const m = segment.match(
        /D\((\d+),([\d.]+),([\d.]+),([\d.]+),([\d.]+),([\d.]+),([\d.]+),([\d.]+),([\d.]+)\)/
      );
      if (!m) return null;

      const page = Number(m[1]);

      // raw PDF units in inches
      const x1 = Number(m[2]);
      const y1 = Number(m[3]);
      const x3 = Number(m[6]);
      const y3 = Number(m[7]);

      // CMS-1500 real page size
      const PAGE_WIDTH_IN = 8.5;
      const PAGE_HEIGHT_IN = 11.0;

      return {
        page,
        x: x1 / PAGE_WIDTH_IN,
        y: y1 / PAGE_HEIGHT_IN,
        width: (x3 - x1) / PAGE_WIDTH_IN,
        height: (y3 - y1) / PAGE_HEIGHT_IN,
      };
    })
    .filter(Boolean);
}

const CommandCenterTable = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [extractedFields, setExtractedFields] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const [highlightBoxes, setHighlightBoxes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const rowRefs = useRef([]);
  const fileInputRef = useRef();

  const handleUploadClick = () => fileInputRef.current.click();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setUploadProgress(10);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:8000/documents/upload');

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 80) + 10;
          setUploadProgress(percent);
        }
      };

      xhr.onload = async () => {
        setUploadProgress(100);
        setTimeout(() => setUploading(false), 500);

        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);

          const blobUrl = URL.createObjectURL(file);
          setPdfUrl(blobUrl);

          if (data.fields) {
            setExtractedFields(parseExtractedFields(data.fields));
          } else {
            setExtractedFields([]);
          }

          setHighlightBoxes([]);
          setActiveIndex(null);
        } else {
          alert('Upload failed');
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        alert('Upload failed');
      };

      xhr.send(formData);
    } catch (err) {
      setUploading(false);
      alert('Upload failed');
    }
  };

  return (
    <div className="col-9 col-xl-9 col-xxl-9 p-4 float-start">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-uppercase mb-0">Command Center</h4>

        <div className="command-upload-panel">
          {uploading && (
            <div className="mb-2">
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <button
            className="btn btn-success px-4 py-2 fw-semibold"
            onClick={handleUploadClick}
            disabled={uploading}
          >
            <i className="bi bi-upload me-2"></i>Upload Document
          </button>

          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            className="hidden-input"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="row g-4 align-items-start">
        <div className="col-md-5">
          <PDFViewer fileUrl={pdfUrl} highlightBoxes={highlightBoxes} />
        </div>

        <div className="col-md-7">
          <div className="card shadow-sm pdf-table-card">
            <table className="table table-bordered align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Field Label</th>
                  <th>Extracted Value</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {extractedFields.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-muted">
                      No fields extracted
                    </td>
                  </tr>
                ) : (
                  extractedFields.map((field, idx) => (
                    <tr
                      key={idx}
                      ref={(el) => (rowRefs.current[idx] = el)}
                      className={`table-row-clickable ${activeIndex === idx ? 'table-active' : ''}`}
                      onClick={() => {
                        setActiveIndex(idx);

                        const boxes = parseAzureSource(field.source);
                        setHighlightBoxes(boxes);

                        // scroll table row into view
                        rowRefs.current[idx]?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                        });

                        // notify PDF viewer to scroll
                        const first = boxes?.[0];
                        if (first) {
                          window.dispatchEvent(
                            new CustomEvent('scrollToPdfPage', {
                              detail: { page: first.page },
                            })
                          );
                        }
                      }}
                    >
                      <td>{field.label}</td>
                      <td>{field.value}</td>

                      <td className="text-center">
                        <select className="form-select">
                          <option value="1" defaultChecked>
                            Edit
                          </option>
                          <option value="2">Approve</option>
                          <option value="3">Reject</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandCenterTable;