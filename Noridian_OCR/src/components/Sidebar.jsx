import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Sidebar = () => (
  <>
    <div className="col-3 float-start bg-light" >
      <h5 className="fw-bold text-uppercase text-secondary">Overview</h5>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            <i className="bi bi-grid-3x3-gap"></i> Command Center
          </a>
        </li>
        {/* <li>
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
        </li> */}
      </ul>
    </div>
  </>
);

export default Sidebar;
