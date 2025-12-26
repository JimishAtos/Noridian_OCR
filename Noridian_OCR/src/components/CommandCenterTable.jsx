import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PDFViewer from './PDFViewer';

// Utility to convert backend fields object to array for table rendering
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

const CommandCenterTable = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [extractedFields, setExtractedFields] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    setUploadProgress(10);
    try {
      // Use XMLHttpRequest for progress
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:8000/documents/upload');
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 80) + 10; // up to 90%
          setUploadProgress(percent);
        }
      };
      xhr.onload = async () => {
        setUploadProgress(100);
        setTimeout(() => setUploading(false), 500);
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          console.log('Backend response:', data);
          // Set PDF preview
          const blobUrl = URL.createObjectURL(file);
          setPdfUrl(blobUrl);
          // Parse and set extracted fields from backend response
          if (data.fields) {
            setExtractedFields(parseExtractedFields(data.fields));
          } else {
            setExtractedFields([]);
          }
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
        <div style={{ minWidth: 250 }}>
          {uploading && (
            <div className="mb-2">
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  style={{ width: `${uploadProgress}%` }}
                  aria-valuenow={uploadProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          )}
          <button className="btn btn-success px-4 py-2 fw-semibold" onClick={handleUploadClick} disabled={uploading}>
            <i className="bi bi-upload me-2"></i>Upload Document
          </button>
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
      </div>
      {uploading && (
        <div className="mb-3">
          <div className="progress p-5">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: `${uploadProgress}%` }}
              aria-valuenow={uploadProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      )}
      <div className="row g-4 align-items-start">
        <div className="col-md-5">
          <PDFViewer fileUrl={pdfUrl} />
        </div>
        <div className="col-md-7">
          <div className="card shadow-sm">
            <table className="table table-bordered align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Field Label</th>
                  <th>Extracted Value</th>
                  {/* <th>Source</th> */}
                  {/* <th>Confidence</th> */}
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {extractedFields.length === 0 ? (
                  <tr><td colSpan={5} className="text-center text-muted">No fields extracted</td></tr>
                ) : (
                  extractedFields.map((field, idx) => (
                    <tr key={idx}>
                      <td>{field.label}</td>
                      <td>{field.value}</td>
                      {/* <td>{field.source}</td> */}
                      {/* <td>{field.confidence != null ? field.confidence : ''}</td> */}
                      {/* <td className="text-center">
                          <button className="btn btn-sm btn-outline-primary me-1" title="Edit"><i className="bi bi-pen"></i></button>
                          <button className="btn btn-sm btn-outline-success me-1" title="Thumbs Up"><i className="bi bi-hand-thumbs-up"></i></button>
                          <button className="btn btn-sm btn-outline-danger" title="Thumbs Down"><i className="bi bi-hand-thumbs-down"></i></button>
                        </td> */}
                      <td className="text-center">
                        <select className="form-select" aria-label="Default select">
                          <option value="1" selected>Edit</option>
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
