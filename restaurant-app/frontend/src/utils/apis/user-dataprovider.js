import { getData, postData } from './api-dataprovider';

const getUsersList = async () => {
  try {
    return await getData(`/users`);
  } catch (error) {
    console.error(error);
  }
}
const loginUser = async (path, data) => {
  try {
    return await postData(path, data)
  } catch (error) {
    console.log(error);
  }
}
const registerUser = async (path, data) => {
  try {
    return await postData(path, data)
  } catch (error) {
    console.log(error)
  }
}

  export { getUsersList, loginUser,registerUser };
