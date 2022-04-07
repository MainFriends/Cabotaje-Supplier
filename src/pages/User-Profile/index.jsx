import {useState, useEffect} from 'react';

import NavbarProfile from "../../components/NavbarProfile"
import InformationForm from "../../components/user-profile/InformationForm"
import UserImageProfile from "../../components/UserImageProfile"
import AlertSuccess from '../../components/AlertSuccess';

import axios from '../../config/axios';
import token from '../../helpers/getToken';
import moment from 'moment';


const Profile = () => {
    const [alertMessage, setAlertMessage] = useState('');
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
        NAM_ROLE
    } = userInformation;

    useEffect(() => {
        axios.get('/user-profile', token())
            .then(res => {
                setUserInformation({
                    ...res.data[0],
                    DAT_BIRTHDAY: moment(res.data[0].DAT_BIRTHDAY).format('YYYY-MM-DD')
                });
            })
    }, [])

    return(
        <div className="container-fluid bg-light container-profile">
            <NavbarProfile/>
            {alertMessage ? <AlertSuccess message={alertMessage}/> : null}
            <div className="row p-3 ">
                <div className="col-md-3">
                    <div className="row mb-0">
                        <div className="col-md-4">
                            <UserImageProfile
                                width={'120vw'}
                                height={'120vw'}
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
                    setAlertMessage={setAlertMessage}
                    />
                </div>
            </div>
        </div>
    )
}


export default Profile