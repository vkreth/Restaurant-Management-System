import {getData} from "./api-dataprovider.js";
const url = '/dashboard';
const getDashboard = async (path = '') => {
    try {
        return await getData(url + path)
    } catch (error) {
        console.log(error)
    }
}

export {getDashboard};
