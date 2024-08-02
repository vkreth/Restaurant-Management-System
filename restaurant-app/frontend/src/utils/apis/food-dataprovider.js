import { deleteData, getData, postData,putData } from './api-dataprovider';

const getFood=async(path)=>{
try{
    return await getData(path)
}catch(error){
    console.log(error)
}
}

const addFoodItem=async(path,data)=>{
    try{
        return await postData(path,data)
    }catch(error){
        console.log(error)
    }
}
const deleteFoodItem=async(path)=>{
    try{
        return await deleteData(path)
    }catch(error){
        console.log(error)
    }
}

const getFoodItem=async(path)=>{
    try{
        return await getData(`/foodItem/${path}`)
    }catch(error){
        console.log(error)
    }
}

const editFoodItem=async(path,data)=>{
    try{
        return await putData(path,data)
    }catch(error){
        console.log(error)
    }
}

export {getFood,addFoodItem,deleteFoodItem,editFoodItem, getFoodItem};
