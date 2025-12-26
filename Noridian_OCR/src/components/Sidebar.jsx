const Sidebar = ({ collapsed }) => {
  return (
    
    <aside id="sidebar" className={collapsed ? "collapsed" : ""}>
      <div className="h-100">
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <i className="fa-solid fa-list pe-2"></i>
              Profile
            </a>
          </li>
          <li className="sidebar-item">
            <a href="#" className="sidebar-link collapsed" data-bs-toggle="collapse" data-bs-target="#pages"
              aria-expanded="false" aria-controls="pages">
              <i className="fa-regular fa-file-lines pe-2"></i>
              Pages
            </a>
            <ul id="pages" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">Analytics</a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">Ecommerce</a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">Crypto</a>
              </li>
            </ul>
          </li>
          <li className="sidebar-item">
            <a href="#" className="sidebar-link collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard"
              aria-expanded="false" aria-controls="dashboard">
              <i className="fa-solid fa-sliders pe-2"></i>
              Dashboard
            </a>
            <ul id="dashboard" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">Dashboard Analytics</a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">Dashboard Ecommerce</a>
              </li>
            </ul>
          </li>
          <li className="sidebar-item">
            <a href="#" className="sidebar-link collapsed" data-bs-toggle="collapse" data-bs-target="#auth"
              aria-expanded="false" aria-controls="auth">
              <i className="fa-regular fa-user pe-2"></i>
              Auth
            </a>
            <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">Login</a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">Register</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
