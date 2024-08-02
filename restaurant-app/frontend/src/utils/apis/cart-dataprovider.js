import { getData, postData,putData,deleteData } from './api-dataprovider';

const url='/cart'
const getCart=async(path)=>{
    try{
        return await getData(url+path)
    }catch(error){
        console.log(error)
    }
}
const addProduct=async(path,data)=>{
    try{
        return await postData(url+path,data)
    }catch(error){
        console.log(error)
    }
}
const removeProduct=async(path)=>{
    try{
        return await deleteData(url+path)
    }catch(error){
        console.log(error)
    }
}
const deleteCart=async(path)=>{
    try{
        return await deleteData(url+path)
    }catch(error){
        console.log(error)
    }
}
const addQuantity=async(path)=>{
    try{
        return await putData(url+path)
    }catch(error){
        console.log(error)
    }
}
const reduceQuantity=async(path)=>{
    try{
        return await putData(url+path)
    }catch(error){
        console.log(error)
    }
}
export {getCart,addProduct,removeProduct,deleteCart,addQuantity,reduceQuantity}