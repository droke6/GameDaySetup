import axios from 'axios';

export const getCsrfToken = async () => {
    const response = await axios.get('/netHeight/net-height/');
    const csrfToken = response.headers['x-csrftoken'];
    axios.defaults.headers.post['X-CSRFToken'] = csrfToken;
    return csrfToken;
};
