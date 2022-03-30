import axios from '../config/axios';

const get = async credentials => {
    const {data} = await axios.get('/sale-invoice', credentials);
    return data;
}

export {
    get
}