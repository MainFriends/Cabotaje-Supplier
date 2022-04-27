import AlertError from './AlertError';

const LoginForm = ({setFormLogin, handleLoginSubmit, errorMessage}) => {

    return (
        <div className="container-fluid login">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6 col-form">
                                    <div className="p-5">
                                        <div className="text-center ">
                                            <h2 className="font-weight-bold text-dark mb-4">Inicio de sesión</h2>
                                        </div>
                                        <form className="user" action='#'>
                                            <div className="form-group">
                                                <input onChange={setFormLogin} type="email" className="form-control form-control-user"
                                                    name="EMAIL"
                                                    placeholder="Correo electrónico" required>
                                                </input>
                                            </div>
                                            <div className="form-group">
                                                <input onChange={setFormLogin} type="password" className="form-control form-control-user"
                                                    id="password" name="PASSWORD" placeholder="Contraseña" required>
                                                </input>
                                            </div>
                                            <hr/>
                                            <button onClick={handleLoginSubmit} type='submit' className="btn btn-primary btn-user btn-block">
                                                Iniciar sesión
                                            </button>
                                            <div className="text-muted font-weight-light mt-3 small">¿Olvidaste tu contraseña? Informale a tu gerente o encargado.</div>
                                        </form>
                                    </div>
                                    {errorMessage ? <AlertError message={errorMessage}/> : null};
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;