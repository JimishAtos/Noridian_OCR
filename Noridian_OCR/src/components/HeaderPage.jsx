import noridianLogo from '../assets/images/noridianLogo.png';

const HeaderPage = ({ onToggleSidebar }) => {
    return (
        <header className="header" id="header">
            <div className="header_img">
                <img src={noridianLogo} alt="Noridian Logo" /> </div>
            <button
                className="btn"
                type="button"
                id="sidebar-toggle-btn"
                onClick={onToggleSidebar}
                style={{ background: "#007bff", border: "none", color: "#fff", padding: "0.5rem 1rem", borderRadius: "0.25rem" }}
            >
                <span className="navbar-toggler-icon"></span> Toggle
            </button>
        </header>
    );
}

export default HeaderPage;