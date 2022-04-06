const getToken = () => {
    const {token} = JSON.parse(window.localStorage.getItem('userSession')) || '';

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    return config;  
}

export default getToken;