import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import lock from '../assets/lock.png'
import { loginApi, registerRequestApi } from '../service/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth({ register }) {

  const navigate = useNavigate()

  const [userDetails, setUserDetails] = useState({
    username:"",
    email:"",
    password:"",
  })
  console.log(userDetails);
  const handleRegister = async()=>{
    const {username,email,password} = userDetails
    if(!username || !email || !password){
      toast.info('Fill the form')
    } else{
      const result = await registerRequestApi(userDetails)
      console.log(result);

      if(result.status >= 200 && result.status < 300){
        toast.success("Registration successfull")
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
        navigate("/login")

      }
      else if(result.status == 406){
        toast.warning(result.response.status)
      }
      else{
        toast.error('something went wrong')
      }
      

    }
  }

  const handleLogin = async()=>{
    const {email,password} = userDetails
    if(!email || !password){
      toast.info('fill the form completely')
    }
    
    else{
      const result = await loginApi({email,password})
      console.log(result);
      if(result.status >= 200 && result.status < 300){
        toast.success('Login successfull')

        sessionStorage.setItem("existingUsers",JSON.stringify(result.data.existingUsers))
        sessionStorage.setItem("token",result.data.token)

        setUserDetails({
          username:"",
          email:"",
          password:""
        })
        setTimeout(()=>{
          navigate("/")
        },2000)
      }else if(result.status == 406){
        toast.warning(result.response.status)
      }
      else{
        toast.error('something went wrong')
      }
    }

  }

  

  return (
    <>
      <div className='mt-5'>
        <div className="container ">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <Link to={'/'} style={{ textDecoration: 'none' }}><h2 className='text-warning'><FontAwesomeIcon icon={faArrowLeft} className='text-warning me-3' />Back Home</h2></Link>
              <div className='bg-info p-5'>
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                      <img src={lock} alt="lock image" className='w-75 ' />
                    </div>
  
                    <div className="col-md-6">
                      <div className='text-center'>
                        <h3 className='text-light me-3 mt-4'><FontAwesomeIcon icon={faStackOverflow} className='text-light' /> Project Fair</h3>
  
                        {!register ? <h6 className='text-light mt-2'>Sign In to Your Account</h6>
                          :
                          <h6 className='text-light mt-2'>Sign Up to Your Account</h6>}
  
                      </div>
  
                      {register && <input type="text" placeholder='username' className='form-control mt-4' onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})}/>}
  
  
  
                      <input type="text" placeholder='Email ID' className='form-control mt-4' onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}/>
  
  
                      <input type="password" placeholder='Password' className='form-control mt-3' onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}/>
  
                      {!register ? <div>
                        <button className='btn btn-warning mt-3 w-100' onClick={handleLogin}>Login</button>
                        <h6 className='text-light mt-4'>New User? click Here to <Link to={'/register'} className='text-danger'>Register</Link> </h6>
                      </div>
                        :
                        <div>
                          <button className='btn btn-warning mt-3 w-100' onClick={handleRegister}>Register</button>
                          <h6 className='text-light mt-4'>Already a  User? click Here to <Link to={'/login'} className='text-danger'>Login</Link> </h6>
                        </div>}
  
  
                    </div>
                  </div>
                </div>
  
              </div>
  
            </div>
            <div className="col-md-1"></div>
          </div>
  
        </div>
  
      </div>
      <ToastContainer position='top-center' theme="colored" autoClose={2000}/>
    </>
  )
}

export default Auth