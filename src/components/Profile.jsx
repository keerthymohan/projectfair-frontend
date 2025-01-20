import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../service/serviceUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProfileApi } from '../service/allApi';
import Collapse from 'react-bootstrap/Collapse';

function Profile() {
    const [open, setOpen] = useState(false);
    const [updateStatus , setUpdatStatus] = useState({})
    const [preview,setPreview] = useState("")
    const [existingImage,setExistingImage] = useState("")
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password:"",
        profile: "",
        github: "",
        linkedin: "",
    })
    console.log(userDetails);
    const handleFile = (e)=>{
        setUserDetails({...userDetails,profile:e.target.files[0]})
    }
    useEffect(()=>{
        if(userDetails.profile){
            setPreview(URL.createObjectURL(userDetails.profile))
        }
    },[userDetails.profile])
    console.log(preview);
    
   

    const handleUpdate = async()=>{
        const { username, email, password, profile, github, linkedin} = userDetails
        if(!github || !linkedin){
            toast.info("Enter Github & LinkedIn")
        }else{
            const reqBody = new FormData()
            reqBody.append("username",username)
            reqBody.append("email",email)
            reqBody.append("password",password)
            reqBody.append("github",github)
            reqBody.append("linkedin",linkedin)
            preview?
            reqBody.append("profile",profile) :
            reqBody.append("profile",existingImage)

            const token = sessionStorage.getItem("token")
            if(preview){
                const reqHeader = {
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${token}`
                  }
                  const result = await updateUserProfileApi(reqBody,reqHeader)
                  console.log(result);
                  if(result.status == 200){
                    toast.success('profile updated successfully')
                    sessionStorage.setItem("existingUsers",JSON.stringify(result.data))
                    setUpdatStatus(result)
                  }else{
                    toast.error("something went wrong")
                  }
                  
            }else{
                const reqHeader = {
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                  }
                  const result = await updateUserProfileApi(reqBody,reqHeader)
                  console.log(result);
                  if(result.status == 200){
                    toast.success('profile updated successfully')
                    sessionStorage.setItem("existingUsers",JSON.stringify(result.data))
                    setUpdatStatus(result)
                  }else{
                    toast.error("something went wrong")
                  }

            }

        }

       
    }
    useEffect(()=>{
        if(sessionStorage.getItem("existingUsers")){
            const user = JSON.parse(sessionStorage.getItem("existingUsers"))
            console.log(user);
            setUserDetails({...userDetails,username:user.username, email:user.email, password:user.password, github:user.github, linkedin:user.linkedin})
            setExistingImage(user.profile)

        }
    },[updateStatus])

    
  return (
    <>
    <div className='shadow p-5' onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
        <div className='d-flex align-items-center justify-content-between'>
            <h4 className='text-success'>Profile</h4>
            <button onClick={() => setOpen(!open)} className='btn shadow'>
                {open == true ?<FontAwesomeIcon icon={faAngleUp} />
                :
                <FontAwesomeIcon icon={faAngleDown} />}

                </button>
        </div>
        <Collapse in={open}>
        <div>
            <div className='d-flex justify-content-center align-items-center flex-column'>
            <label htmlFor="profileimage" className='d-flex justify-content-center align-items-center'>
                 <input onChange={(e)=>handleFile(e)} type="file" id='profileimage' className='d-none' />
                                {existingImage == ""?
                                <img src={preview?preview:"https://vpal.harvard.edu/sites/projects.iq.harvard.edu/files/styles/os_files_large/public/vpl/files/syllabus-acceptableuse.png?m=1598045026&itok=quSdE82h"} alt="profile image" style={{width:'200px', height:'200px',borderRadius:'50%',marginBottom:'10px'}}/>
    :
                                <img src={preview?preview:`${serverUrl}/upload/${existingImage}`} alt="profile image" style={{width:'200px', height:'200px',borderRadius:'50%',marginBottom:'10px'}} />}
    
                            </label>
                            <div className="w-100">
                                <div className="mb-3">
                                    <input onChange={(e)=>setUserDetails({...userDetails,github:e.target.value})} value={userDetails?.github} type="text" placeholder='Github' className='form-control' />
                                </div>
                                <div className="mb-3">
                                <input onChange={(e)=>setUserDetails({...userDetails,linkedin:e.target.value})} value={userDetails?.linkedin} type="text" placeholder='LinkedIn' className='form-control' />
    
                                </div>
                                <div className="mb-3 text-center">
                                    <button onClick={handleUpdate} className='btn btn-info w-100'>Update Profile</button>
                                </div>
                            </div>
            </div>
        </div>
        </Collapse>

    </div>
              <ToastContainer position='top-center' theme="colored" autoClose={2000}/>
    </>
  )
}

export default Profile