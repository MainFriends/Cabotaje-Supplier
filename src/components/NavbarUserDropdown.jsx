import { Link, useLocation } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import UserImageProfile from "./UserImageProfile";

const NavbarUserDropdown = ({profilePicture}) => {

    const {pathname} = useLocation();
    const {jwt: {FIRST_NAME, LAST_NAME}, logout} = useUser();

    const handleLogout = () => {
        logout();
    }

    return (
        <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">{`${FIRST_NAME} ${LAST_NAME}`}</span>
                <UserImageProfile
                    src={profilePicture ? `data:image/*;base64, ${profilePicture}` : ''}
                    width={'40px'}
                    height={'40px'}
                />
            </a>

            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown">
                {pathname === '/profile' 
                ?
                <Link className="dropdown-item" to="/dashboard">
                    <i className="fa-solid fa-chart-line mr-2 text-gray-800"></i>
                    Dashboard
                </Link>
                :
                <Link className="dropdown-item" to="/profile">
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-800"></i>
                    Perfil
                </Link>}
                <div className="dropdown-divider"></div>
                <a onClick={handleLogout} className="dropdown-item" href="#">
                    <i className="fa-solid fa-right-from-bracket mr-2 text-gray-800"></i>
                    Cerrar sesión
                </a>
            </div>
        </li>
    )
}

export default NavbarUserDropdown;