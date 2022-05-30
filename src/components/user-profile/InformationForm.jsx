import UserImageProfile from "../UserImageProfile"
import token from '../../helpers/getToken';
import axios from '../../config/axios';
import { useEffect, useState } from "react";


const InformationForm = ({setSendRequest, profilePicture, userInformation, setUserInformation, setAlertMessage}) => {

    // const [file, setFile] = useState(null)

    // const {
    //     FIRST_NAME,
    //     MIDDLE_NAME,
    //     LAST_NAME,
    //     NAM_CITY,
    //     ADDRESS,
    //     DAT_BIRTHDAY
    // } = userInformation;

    // const handleChangeInput = (e) => {
    //     setUserInformation({
    //         ...userInformation,
    //         [e.target.name]: e.target.value
    //     })
    // }

    // const handleChangeImg = (e) => {
    //     setFile(e.target.files[0]);
    // }

    // const handleSubmitForm = (e) => {
    //     e.preventDefault();
    //     axios.put('/user-profile', userInformation, token())
    //         .then(res => {
    //             const {message} = res.data
    //             setAlertMessage({
    //                 message,
    //                 ok: true
    //             })
    //             setSendRequest(true);
    //             setTimeout(() => {
    //                 setAlertMessage({
    //                     message: '',
    //                     ok: ''
    //                 });
    //             }, 3000);
    //         })
    // }

    // useEffect(() => {
    //     if(file){
    //         const formData = new FormData();
    //         formData.append('image', file);

    //         axios.put('/profile-picture', formData, token())
    //             .then(res => {
    //                 document.querySelector('#changeProfilePic').value = '';
    //                 setAlertMessage({
    //                     message: 'Foto de perfil cambiada exitosamene.',
    //                     ok: true
    //                 })
    //                 setSendRequest(true)

    //                 setTimeout(() => {
    //                     setAlertMessage({
    //                         message: '',
    //                         ok: ''
    //                     });
    //                 }, 3000);
    //             })
    //             .catch(res => {
    //                 setAlertMessage({
    //                     message: 'La imagen es demasiado grande.',
    //                     ok: false
    //                 })

    //                 setTimeout(() => {
    //                     setAlertMessage({
    //                         message: '',
    //                         ok: ''
    //                     });
    //                 }, 3000);
    //             })
    //     }
    // }, [file])

    return (
        <>
            <h1>Hola Mundo</h1>
        </>
    )
}

export default InformationForm