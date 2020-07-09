import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-demo-form-app.firebaseio.com/'
}
)
export default instance;