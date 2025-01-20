import { commonApi } from "./commonApi"
import { serverUrl } from "./serviceUrl"

// register request
export const registerRequestApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
} 
// logi request
export const loginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
}

// add project
export const addProjectApi = async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/add-project`,reqBody,reqHeader)
}

// get home project
export const homeProjectApi = async()=>{
    return await commonApi('GET',`${serverUrl}/home-project`)
}
// get all project
export const allProjectApi = async(searchKey,reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/all-project?search=${searchKey}`,"",reqHeader)
}

// all user project
export const allUserProjectApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/user-project`,"",reqHeader)
}

// api to remove user project
export const deleteUserProjectApi = async(id,reqHeader)=>{
    return await commonApi('DELETE',`${serverUrl}/remove-userproject/${id}`,{}, reqHeader)
}

// api to update user project
export const updateUserProjectApi = async(id,reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-userproject/${id}`,reqBody,reqHeader)
}

// api to update user profile
export const updateUserProfileApi = async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-profile/`,reqBody,reqHeader)
}