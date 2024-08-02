import { getData, postData,putData,deleteData } from './api-dataprovider';

const url = '/order'
const getOrders = async (path) => {
    try {
        return await getData(url + path)
    } catch (error) {
        console.log(error)
    }
}
const createOrder=async(path,data)=>{
    try{
        return await postData(url+path,data)
    }catch(error){
        console.log(error)
    }
}
const updateOrder=async(path,data)=>{
    try{
        return await putData(`${url}/${path}`, {status: data})
    }catch(error){
        console.log(error)
    }
}
const deleteOrder=async(path)=>{
    try{
        return await deleteData(url+path)
    }catch(error){
        console.log(error)
    }
}
const getAllOrders=async(path)=>{
    try{
        return await getData(url+path)
    }catch(error){
        console.log(error)
    }
}
export {getOrders,createOrder,updateOrder,deleteOrder,getAllOrders}
