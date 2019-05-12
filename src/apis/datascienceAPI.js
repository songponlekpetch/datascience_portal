import axios from 'axios'

const datascienceAPI = axios.create({
    baseURL: 'http://localhost:5000',
})

datascienceAPI.interceptors.request.use(request => {
    const token = localStorage.getItem('accessToken');
    request.headers.Authorization = token ? `Bearer ${token}` : '';
    return request;

}, error => {
    return Promise.reject(error);
});

datascienceAPI.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        this.props.history.push(`/`)
    }

    return Promise.reject(error);
});

export default datascienceAPI