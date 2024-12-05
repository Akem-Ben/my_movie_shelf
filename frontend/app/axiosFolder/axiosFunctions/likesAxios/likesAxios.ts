import axios from '../../configurations/axiosSetup';


export const likePost = async(id:string)=>{
    try{
      const response = await axios.post(`/post/likePost/${id}`)
    return response
    }catch(error:any){
      return error.response
    }
}

export const disLikePost = async(id:string)=>{
    try{
        const response = await axios.post(`/post/dislikePost/${id}`)
        return response
    }catch(error:any){
        return error.response
      }
}

export const getAllLikes = async(id:string) => {
    try{
        const response = await axios.get(`/post/allLikes/${id}`)
        return response
    }catch(error:any){
        return error.response
    }
}

export const getAllDislikes = async(id:string) => {
    try{
        const response = await axios.get(`/post/allDislikes/${id}`)
        return response
    }catch(error:any){
        return error.response
    }
}