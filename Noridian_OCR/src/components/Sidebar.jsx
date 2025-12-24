import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => (
  <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: '250px', height: '100vh'}}>
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
      <span className="fs-4 fw-bold">Noridian OCR</span>
    </a>
    <hr />
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <a href="#" className="nav-link active" aria-current="page">
          <i className="bi bi-grid-3x3-gap"></i> Command Center
        </a>
      </li>
      <li>
        <a href="#" className="nav-link text-dark">
          <i className="bi bi-box-arrow-in-down"></i> Ingestion Hub
        </a>
      </li>
      <li>
        <a href="#" className="nav-link text-dark">
          <i className="bi bi-translate"></i> Translate
        </a>
      </li>
      <li>
        <a href="#" className="nav-link text-dark">
          <i className="bi bi-clock-history"></i> Reports
        </a>
      </li>
    </ul>
    <div className="mt-auto d-flex align-items-center">
      <div className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center me-2" style={{width: '40px', height: '40px'}}>JD</div>
      <span>John Doe</span>
    </div>
  </div>
);

export default Sidebar;
