import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Pages from "./routes";

const App = () => {
  //Comprobamos la sesión
  const navigate = useNavigate();
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if(!loggedUser){
      navigate('/');
    }else{
      navigate('/dashboard');
    }
  }, [])

  return (
    <Pages />
  );
};

export default App;
