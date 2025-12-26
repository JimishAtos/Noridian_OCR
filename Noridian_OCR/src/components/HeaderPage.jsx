
import noridianLogo from '../assets/images/noridianLogo.png';

const HeaderPage = () => {
    return (
        <section className="isHeader clearfix mb-5">
            <div className="col-3 float-start isLogo">
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
            </div>
        </section>
    )
}

export default HeaderPage;