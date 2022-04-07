import UserImageProfile from "../UserImageProfile"
import token from '../../helpers/getToken';
import axios from '../../config/axios';


const InformationForm = ({userInformation, setUserInformation, setAlertMessage}) => {

    const {
        FIRST_NAME,
        MIDDLE_NAME,
        LAST_NAME,
        NAM_CITY,
        ADDRESS,
        DAT_BIRTHDAY,
        IMG_USER
    } = userInformation;

    const handleChangeInput = (e) => {
        setUserInformation({
            ...userInformation,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeImg = (e) => {
        let formData = new FormData();
        formData.append('image', e.target.files[0])

        setUserInformation({
            ...userInformation,
            IMG_USER: formData
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        axios.put('/user-profile', userInformation, token())
            .then(res => {
                const {message} = res.data
                setAlertMessage(message);
                setTimeout(() => {
                    setAlertMessage('');
                }, 3000);
            })
    }

    return (
        <>
            <h1 className="text-dark">Información del perfil</h1>
            <hr />
            <form onSubmit={handleSubmitForm} action="#">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Nombre completo</label>
                            <input onChange={handleChangeInput} className="form-control text-dark" type="text" value={`${FIRST_NAME} ${MIDDLE_NAME} ${LAST_NAME}`} name="" disabled/>
                        </div>
                        <div className="form-group">
                            <label>Ciudad</label>
                            <input onChange={handleChangeInput} className="form-control text-dark" type="text" value={NAM_CITY} name="NAM_CITY" required/>
                        </div>
                        <div className="form-group">
                            <label>Dirección</label>
                            <input onChange={handleChangeInput} className="form-control text-dark" type="text" value={ADDRESS} name="ADDRESS" required/>
                        </div>
                        <div className="form-group">
                            <label>Fecha de nacimiento</label>
                            <input onChange={handleChangeInput} className="form-control text-dark" type="date" value={DAT_BIRTHDAY} name="DAT_BIRTHDAY" required/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h6>Foto de perfil</h6>
                        <div className="text-center">
                            <UserImageProfile
                                    width={'300px'}
                                    height={'300px'}
                            />
                        </div>
                        <input onChange={handleChangeImg} className="mt-4 mb-2" type="file"/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-success">Actualizar información</button>
                </div>
            </form>
        </>
    )
}

export default InformationForm