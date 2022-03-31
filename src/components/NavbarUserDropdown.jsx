import { useLayoutEffect, useState } from "react";

const NavbarUserDropdown = () => {

    const [userSession, setUserSession] = useState({});

    useLayoutEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser');
        const user = JSON.parse(loggedUser);
        setUserSession(user);
    },[]);

    const {FIRST_NAME, LAST_NAME} = userSession;

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser');
        setUserSession(null);
        window.location.reload(true);
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
                <a className="dropdown-item" href="#">
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Perfil
                </a>
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