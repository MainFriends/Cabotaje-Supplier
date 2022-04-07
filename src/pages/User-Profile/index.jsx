import NavbarProfile from "../../components/NavbarProfile"

const Profile = () => {

    return(
        <div className="container-fluid bg-light container-profile">
            <NavbarProfile/>
            <div className="row p-3 ">
                <div className="col-md-3 menu-profile">
                    <div className="row mb-0">
                        <div className="col-md-4">
                            <img class="rounded-circle ml-4" height='100px' width='100px' src="https://avatars.githubusercontent.com/u/86571481?s=400&u=a7dd87caa77fe26d7b5e74191c47f38ceee0d325&v=4" alt="Perfil del usuario"/>
                        </div>
                        <div className="col-md-8">
                            <h4 className="ml-4 mt-4 mb-0 text-dark">Luis Garcia</h4>
                            <p className="ml-4 mt-0 text-dark">Administrador</p>
                        </div>
                    </div>
                    <hr />
                    <div class="list-group">
                        <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                            Información
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">Cambiar contraseña</a>
                    </div>
                </div>
                <div className="col-md-8 mt-4">
                    <h1 className="text-dark">Información del perfil</h1>
                    <hr />
                    <form action="#">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Nombre completo</label>
                                    <input className="form-control text-dark" type="text" value='Luis Eduardo Garcia' name="" />
                                </div>
                                <div className="form-group">
                                    <label>Ciudad</label>
                                    <input className="form-control text-dark" type="text" value='Tegucigalpa' name="" />
                                </div>
                                <div className="form-group">
                                    <label>Dirección</label>
                                    <input className="form-control text-dark" type="text" value='Res. Plaza' name="" />
                                </div>
                                <div className="form-group">
                                    <label>Fecha de nacimiento</label>
                                    <input className="form-control text-dark" type="date" value='1998-02-12' name="" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h6>Foto de perfil</h6>
                                <div className="text-center">
                                    <img class="rounded-circle ml-4" height='300px' width='300px' src="https://avatars.githubusercontent.com/u/86571481?s=400&u=a7dd87caa77fe26d7b5e74191c47f38ceee0d325&v=4" alt="Perfil del usuario"/>
                                </div>
                                <input className="mt-4 mb-2" type="file" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success">Actualizar información</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Profile