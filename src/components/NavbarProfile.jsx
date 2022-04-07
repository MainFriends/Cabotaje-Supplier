import NavbarAlerts from "./NavbarAlerts";
import NavbarMessages from "./NavbarMessages";
import NavbarUserDropdown from "./NavbarUserDropdown";

const NavbarProfile = ({clickMenuOpen, setClickMenu}) => {  
    

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-1 static-top shadow">

            <ul className="navbar-nav ml-auto">

                <NavbarAlerts />

                <NavbarMessages />

                <div className="topbar-divider d-none d-sm-block"></div>

                <NavbarUserDropdown />

            </ul>

        </nav>
    )
}

export default NavbarProfile;