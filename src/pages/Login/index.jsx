import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import useForm from '../../hooks/useForm';
import login from '../../services/login';

const Login = () => {
    document.title = "Cabotaje Supplier - Login"

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

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

        //Validar login
        login(formLogin)
            .then(data => {
                //Guardamos información en el Local Storage
                window.localStorage.setItem('loggedUser', JSON.stringify(data));
                //redireccion
                navigate('/dashboard');
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