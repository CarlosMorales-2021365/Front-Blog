import axios from "axios";

export const frontClog = async (formData) => {
    try{
        return await axios.post('http://127.0.0.1:3001/blogDeAprendizaje/v1', formData)
    }catch(error){
        return{
            error: true,
            message: error.response.data
        }
    }
}