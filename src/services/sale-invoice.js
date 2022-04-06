import axios from '../config/axios';
import token from '../helpers/getToken'

const getInvoices = async () => {
    //consultar api
    const {data} = await axios.get('/sale-invoice', token());
    
    return data
}

export {
    getInvoices
}