import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const NavbarUserDropdown = () => {

    const {jwt: {FIRST_NAME, LAST_NAME}, logout} = useUser();

    const handleLogout = () => {
        logout();
    }

    return (
        <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">{`${FIRST_NAME} ${LAST_NAME}`}</span>
                <img className="img-profile rounded-circle"
                    src='../src/assets/img/undraw_profile_1.svg'></img>
            </a>

            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown">
                <Link className="dropdown-item" to="/profile">
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Perfil
                </Link>
                <a className="dropdown-item" href="#">
                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                    Configuración
                </a>
                <a className="dropdown-item" href="#">
                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                    Registro de actividades
                </a>
                <div className="dropdown-divider"></div>
                <a onClick={handleLogout} className="dropdown-item" href="#">
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Cerrar sesión
                </a>
            </div>
        </li>
    )
}

export default NavbarUserDropdown;