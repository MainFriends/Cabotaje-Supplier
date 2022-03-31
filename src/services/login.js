import axios from '../config/axios';

const login = async credentials => {
    const {data} = await axios.post('/login', credentials);
    return data;
}

export default login;