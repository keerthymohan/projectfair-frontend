import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { loginResponseContext } from '../context/ContextShare';


function LoginHead() {
    const {setLoginResponse} = useContext(loginResponseContext)
  
  const [token,setToken] = useState("")
  const navigate = useNavigate()
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])

  const handleLogout = ()=>{
    sessionStorage.removeItem("existingUsers")
    sessionStorage.removeItem("token")
    setLoginResponse(false)
    navigate('/')
  }
  return (
    <>
         <Navbar className="bg-info d-flex align-items-center" fixed="top">
        <Container>
          <Navbar.Brand>
            <Link to={'login'} style={{textDecoration:'none'}}><h1 className='text-light me-3'><FontAwesomeIcon icon={faStackOverflow} className='text-light'/> Project Fair</h1></Link>
          </Navbar.Brand>
          {token && <button onClick={handleLogout} className='btn btn-warning ms-auto p-2'><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>}
        </Container>
        
      </Navbar>
    </>
  )
}

export default LoginHead