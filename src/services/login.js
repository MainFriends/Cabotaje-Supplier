import axios from '../config/axios';

const login = async config => {
    const {data} = await axios.post('/login', config);
    return data;
}

export default login;