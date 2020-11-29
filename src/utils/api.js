import axios from 'axios';

import BASE_URL from './url';

const instance = axios.create({
    baseURL: BASE_URL,
    // baseURL: 'http://157.122.54.189:9060',
    timeout: 5000,  // 1s
    // headers: {'X-Custom-Header': 'foobar'}
});


export default instance;