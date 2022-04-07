import UserImageProfile from "../UserImageProfile"
import moment from "moment";


const InformationForm = ({userInformation, setUserInformation}) => {

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

    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log(userInformation)
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
                            <input onChange={handleChangeInput} className="form-control text-dark" type="text" value={`${FIRST_NAME} ${MIDDLE_NAME} ${LAST_NAME}`} name="" disabled />
                        </div>
                        <div className="form-group">
                            <label>Ciudad</label>
                            <input onChange={handleChangeInput} className="form-control text-dark" type="text" value={NAM_CITY} name="NAM_CITY" />
                        </div>
                        <div className="form-group">
                            <label>Dirección</label>
                            <input onChange={handleChangeInput} className="form-control text-dark" type="text" value={ADDRESS} name="ADDRESS" />
                        </div>
                        <div className="form-group">
                            <label>Fecha de nacimiento</label>
                            <input onChange={handleChangeInput} className="form-control text-dark" type="date" value={moment(DAT_BIRTHDAY).format('YYYY-MM-DD')} name="DAT_BIRTHDAY" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h6>Foto de perfil</h6>
                        <div className="text-center">
                            <UserImageProfile
                                    src={'https://avatars.githubusercontent.com/u/86571481?s=400&u=a7dd87caa77fe26d7b5e74191c47f38ceee0d325&v=4'}
                                    width={'300px'}
                                    height={'300px'}
                            />
                        </div>
                        <input onChange={handleChangeInput} name="IMG_USER" className="mt-4 mb-2" type="file" />
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