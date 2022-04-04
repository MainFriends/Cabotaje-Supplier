const {token} = JSON.parse(window.localStorage.getItem('userSession')) || '';

const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}

export default config;