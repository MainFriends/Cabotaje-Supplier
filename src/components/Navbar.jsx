import {useState, useEffect} from 'react'
import NavbarAlerts from "./NavbarAlerts";
import NavbarMessages from "./NavbarMessages";
import NavbarSearch from "./NavbarSearch";
import NavbarUserDropdown from "./NavbarUserDropdown";
import axios from '../config/axios';
import token from '../helpers/getToken';
import {Buffer} from 'buffer';

const Navbar = ({clickMenuOpen, setClickMenu}) => {  
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        axios.get('/profile-picture', token())
            .then(res => {
                const {IMG_USER} = res.data[0];
                setProfilePicture(Buffer.from(IMG_USER).toString('base64'));
            })
    }, [])

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            <button onClick={() => { setClickMenu(clickMenuOpen ? false : true); }} className="btn btn-danger" id="sidebarToggle"><i className="fas fa-bars"></i></button>

            {/* <NavbarSearch /> */}

            <ul className="navbar-nav ml-auto">

                <NavbarAlerts />

                <NavbarMessages />

                <div className="topbar-divider d-none d-sm-block"></div>

                <NavbarUserDropdown profilePicture={profilePicture}/>

            </ul>

        </nav>
    )
}

export default Navbar;