import axios from 'axios';

const url = "http://localhost:3000";

const getData = async (path) => {
  try {
    const response = await axios.get(url + path);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const postData = async (path, data) => {
  try {
    const response = await axios.post(url + path, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const putData = async (path, data) => {
  try {
    const response = await axios.put(url + path, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const deleteData = async (path) => {
  try {
    const response = await axios.delete(url + path);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export { getData, postData, putData, deleteData };
