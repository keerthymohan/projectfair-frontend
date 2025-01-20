import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import EditProject from './EditProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faGlobe, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { allUserProjectApi, deleteUserProjectApi } from '../service/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext, editProjectResponse } from '../context/ContextShare'

function MyProjects() {
  const [userProject,setUserProject] = useState([])
  const [removeStatus,setRemoveStatus] = useState({})

  const {addResponse} =useContext(addResponseContext)
  const {editResponse} = useContext(editProjectResponse)

    const getUserProject = async () => {
      if (sessionStorage.getItem("token")) {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await allUserProjectApi(reqHeader)
        // console.log(result.data);
        setUserProject(result.data)
  
      }
    }
    // console.log(userProject);
    
  

    const handleDelete = async(id)=>{
      if (sessionStorage.getItem("token")) {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await deleteUserProjectApi(id,reqHeader)
        console.log(result);
        if(result.status==200){
          setRemoveStatus(result)
          alert('project Deleted Successfully')
        }else{
          alert('something went wrong')
        }
        
  
      }

    }
    useEffect(()=>{
      getUserProject()
    },[addResponse,removeStatus,editResponse])

  return (
    <>
    <div className='shadow p-5'>
        <div className='d-flex align-items-center justify-content-between'>
            <h4 className='text-success'>My Project</h4>
            <AddProject/>
        </div>

        {userProject?.length>0?
        userProject?.map((item)=>(
          <div className='p-3 bg-light mt-4 rounded d-flex align-items-center justify-content-between'>
          <h5>{item?.title}</h5>
          <div className="d-flex">
            <EditProject projects={item}/>
            <Link to={item?.github} target='_blank'><FontAwesomeIcon icon={faGithub} className='me-3 text-warning'/></Link>
            <Link to={item?.website} target='_blank'><FontAwesomeIcon icon={faGlobe}  className='me-3 text-success' /></Link>
            <FontAwesomeIcon onClick={()=>handleDelete(item?._id)} icon={faTrashCan} className='me-2 text-danger'/>
          </div>
          
        </div>

        ))
        
        :
        <h5 className='text-center mt-5 text-warning'>No project added yet</h5>
        }

    </div>
    </>
  )
}

export default MyProjects