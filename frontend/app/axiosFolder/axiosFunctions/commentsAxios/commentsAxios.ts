import axios from '../../configurations/axiosSetup';


export const createComment = async(body:any, id:string)=>{
    try{
      const response = await axios.post(`/post/makeComment/${id}`, body,{
        headers: {
            "Content-Type" : "application/json"
        }
      })
    return response
    }catch(error:any){
      return error.response
    }
}

export const getComments = async(id:string)=>{
    try{
        const response = await axios.get(`/post/allComments/${id}`)
        return response
    }catch(error:any){
        return error.response
      }
}