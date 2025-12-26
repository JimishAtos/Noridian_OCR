
import noridianLogo from '../assets/images/noridianLogo.png';

const HeaderPage = () => {
    return (
        <section className="clearfix mb-5">
            <header className="header" id="header">
                <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle"></i> </div>
                <div className="header_img"> <img src={noridianLogo} alt="Noridian Logo" /> </div>
            </header>
            {/* <div className="col-3 float-start isLogo">
                <a href="/" className="mb-3 mb-md-0 me-md-auto text-decoration-none">
                    <span className="fs-4 fw-bold">
                        <img src={noridianLogo} alt="Noridian Logo" />
                    </span>
                </a>
            </div>

            <div className="col-9 float-end isUser mt-5">
                <h4 className="text-end">
                    <i class="bi bi-person-bounding-box me-2"></i>
                    John Doe
                </h4>
            </div> */}
        </section>
    )
}

export default HeaderPage;