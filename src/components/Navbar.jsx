import NavbarAlerts from "./NavbarAlerts";
import NavbarMessages from "./NavbarMessages";
import NavbarSearch from "./NavbarSearch";
import NavbarUserDropdown from "./NavbarUserDropdown";

const Navbar = ({clickMenuOpen, setClickMenu}) => {  
    

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            <button onClick={() => { setClickMenu(clickMenuOpen ? false : true); }} className="btn btn-danger" id="sidebarToggle"><i className="fas fa-bars"></i></button>

            <NavbarSearch />

            <ul className="navbar-nav ml-auto">

                <NavbarAlerts />

                <NavbarMessages />

                <div className="topbar-divider d-none d-sm-block"></div>

                <NavbarUserDropdown />

            </ul>

        </nav>
    )
}

export default Navbar;