import { Link } from "react-router-dom";

const Login = () => {
    document.title = "Cabotaje Supplier - Login"

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center ">
                                            <h2 className="font-weight-bold text-dark mb-4">Inicio de sesión</h2>
                                        </div>
                                        <form className="user">
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user"
                                                    id="exampleInputEmail" aria-describedby="emailHelp"
                                                    placeholder="Correo electrónico o código de empleado">
                                                </input>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user"
                                                    id="exampleInputPassword" placeholder="Contraseña">
                                                </input>
                                            </div>
                                            <hr/>
                                            <Link to="/dashboard" className="btn btn-primary btn-user btn-block">
                                                Iniciar sesión
                                            </Link>
                                            <div className="text-muted font-weight-light mt-3 small">¿Olvidaste tu contraseña? Informale a tu gerente o encargado.</div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;