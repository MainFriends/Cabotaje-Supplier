import { Link } from "react-router-dom";

const SidebarHeader = () => {

    return (
        <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
            <div className="sidebar-brand-icon">
                <div className="logo-header"></div>
            </div>
            <div className="sidebar-brand-text mx-0">Cabotaje Supplier</div>
        </Link>
    )
}

export default SidebarHeader;