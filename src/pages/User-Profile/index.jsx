import {useState, useEffect} from 'react';

import NavbarProfile from "../../components/NavbarProfile"
import InformationForm from "../../components/user-profile/InformationForm"
import UserImageProfile from "../../components/UserImageProfile"

import axios from '../../config/axios';
import token from '../../helpers/getToken';


const Profile = () => {
    const [userInformation, setUserInformation] = useState({
        FIRST_NAME: '',
        MIDDLE_NAME: '',
        LAST_NAME: '',
        NAM_CITY: '',
        ADDRESS: '',
        DAT_BIRTHDAY: '',
        IMG_USER: '',
        NAM_ROLE: ''
    });

    const {
        FIRST_NAME,
        LAST_NAME,
        IMG_USER,
        NAM_ROLE,
    } = userInformation;

    useEffect(() => {
        axios.get('/user-profile', token())
            .then(res => {
                setUserInformation(res.data[0]);
            })
    }, [])

    return(
        <div className="container-fluid bg-light container-profile">
            <NavbarProfile/>
            <div className="row p-3 ">
                <div className="col-md-3">
                    <div className="row mb-0">
                        <div className="col-md-4">
                            <UserImageProfile
                                src={'https://avatars.githubusercontent.com/u/86571481?s=400&u=a7dd87caa77fe26d7b5e74191c47f38ceee0d325&v=4'}
                                width={'100px'}
                                height={'100px'}
                            />
                        </div>
                        <div className="col-md-8">
                            <h4 className="ml-4 mt-4 mb-0 text-dark">{`${FIRST_NAME} ${LAST_NAME}`}</h4>
                            <p className="ml-4 mt-0 text-dark">{NAM_ROLE}</p>
                        </div>
                    </div>
                    <hr />
                    <div className="list-group">
                        <a href="#" className="list-group-item list-group-item-action active">Información del perfil</a>
                        <a href="#" className="list-group-item list-group-item-action">Cambiar contraseña</a>
                    </div>
                </div>
                <div className="col-md-8 mt-4">
                    <InformationForm 
                    userInformation={userInformation} 
                    setUserInformation={setUserInformation}
                    />
                </div>
            </div>
        </div>
    )
}


export default Profile