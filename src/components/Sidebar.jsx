import SidebarHeader from "./SidebarHeader";
import SidebarItems from "./SidebarItems";

const Sidebar = ({clickMenuOpen}) => {

    return (
        <ul className={clickMenuOpen ? "navbar-nav bg-danger sidebar sidebar-dark accordion" : "navbar-nav bg-danger sidebar sidebar-dark accordion toggled"} id="accordionSidebar">

            <SidebarHeader />

            <hr className="sidebar-divider my-0"></hr>

            <SidebarItems />

            <hr className="sidebar-divider d-none d-md-block"></hr>

        </ul>
    );
}

export default Sidebar;