import { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import useForm from '../../hooks/useForm';
import loginService from '../../services/login';
import { useUser } from '../../hooks/useUser';

const Login = () => {
    document.title = "Cabotaje Supplier - Login"

    const [errorMessage, setErrorMessage] = useState('');
    const {login} = useUser();

    const [formLogin, setFormLogin] = useForm({
        EMAIL: '',
        PASSWORD: ''
    });

    const handleLoginSubmit = e => {
        e.preventDefault();

        //Validar formulario
        const {EMAIL, PASSWORD} = formLogin;
        if(EMAIL === '' || PASSWORD === ''){
            setErrorMessage('Introduce un correo y contraseña válido.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        //Validar loginService
        loginService(formLogin)
            .then(data => {
                //Guardamos información en el Local Storage
                login(data);
            })
            .catch(err => {
                const {message} = err.response.data;
                setErrorMessage(message);
                document.querySelector('#password').value = '';
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            })
    }

    return (
        <LoginForm 
            setFormLogin={setFormLogin}
            handleLoginSubmit={handleLoginSubmit}
            errorMessage={errorMessage}
        />
    )
}

export default Login;