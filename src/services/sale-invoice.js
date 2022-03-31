import axios from '../config/axios';

const getInvoices = async () => {
    //token extractor
    const {token} = JSON.parse(window.localStorage.getItem('userSession'));
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    //consultar api
    const {data} = await axios.get('/sale-invoice', config);
    
    return data
}

export {
    getInvoices
}