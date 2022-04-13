import {useState, useEffect} from 'react';

import NavbarProfile from "../../components/NavbarProfile"
import InformationForm from "../../components/user-profile/InformationForm"
import UserImageProfile from "../../components/UserImageProfile"
import AlertSuccess from '../../components/AlertSuccess';

import axios from '../../config/axios';
import token from '../../helpers/getToken';
import moment from 'moment';
import {Buffer} from 'buffer';
import ChangePassword from '../../components/user-profile/ChangePassword';


const Profile = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [sendRequest, setSendRequest] = useState(false);
    const [pageActive, setPageActive] = useState('profileInformation');
    const [userInformation, setUserInformation] = useState({
        FIRST_NAME: '',
        MIDDLE_NAME: '',
        LAST_NAME: '',
        NAM_CITY: '',
        ADDRESS: '',
        DAT_BIRTHDAY: '',
        NAM_ROLE: ''
    });

    const {
        FIRST_NAME,
        LAST_NAME,
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

    useEffect(() => {
        axios.get('/profile-picture', token())
            .then(res => {
                const {IMG_USER} = res.data[0];
                setProfilePicture(Buffer.from(IMG_USER).toString('base64'));
                setSendRequest(false);
            })
    }, [sendRequest])

    return(
        <div className="container-fluid bg-light container-profile">
            <NavbarProfile profilePicture={profilePicture}/>
            {alertMessage ? <AlertSuccess message={alertMessage}/> : null}
            <div className="row p-3 ">
                <div className="col-md-3">
                    <div className="row mb-0">
                        <div className="col-md-4">
                            <UserImageProfile
                                src={profilePicture ? `data:image/*;base64, ${profilePicture}` : ''}
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
                        <a href="#" onClick={() => setPageActive('profileInformation')} className={'list-group-item list-group-item-action ' + (pageActive === 'profileInformation' && 'active')}>Información del perfil</a>
                        <a href="#" onClick={() => setPageActive('changePassword')} className={'list-group-item list-group-item-action ' + (pageActive === 'changePassword' && 'active')}>Cambiar contraseña</a>
                    </div>
                </div>
                <div className="col-md-8 mt-4">
                    {pageActive === 'profileInformation'
                    ?
                    <InformationForm 
                    setSendRequest={setSendRequest}
                    profilePicture={profilePicture}
                    userInformation={userInformation} 
                    setUserInformation={setUserInformation}
                    setAlertMessage={setAlertMessage}
                    />
                    :
                    <ChangePassword />
                    }
                </div>
            </div>
        </div>
    )
}


export default Profile