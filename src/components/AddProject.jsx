import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectApi } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addResponseContext } from '../context/ContextShare';

function AddProject() {
  const [show, setShow] = useState(false);

  const {setAddResponse} = useContext(addResponseContext)

  const [previewImage, setPreviewImage] = useState("")

  const [token,setToken] = useState("")
  console.log(token);

  const [key,setKey] = useState(1)

  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImage: ""
  })
  console.log(projectDetails);

  const handleFile = (e) => {
    // console.log(e.target.files[0]);

    setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })
  }

  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreviewImage(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])

  const handleCancel = () => {
    setProjectDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
      projectImage: ""
    })
    
    setPreviewImage("")
    if(key==1){
      setKey(0)
    }else{
      setKey(1)
    }
  }


  const handleClose = () => {
    setShow(false)
    handleCancel()
  }


  const handleAdd = async()=>{
    const {title,language,github,website,overview,projectImage} = projectDetails
    if(!title|| !language ||!github ||!website ||!overview ||!projectImage){
      toast.info("fill the form completely")
    }else{
// apped() - to create reqBody
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)

      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        const result = await addProjectApi(reqBody,reqHeader)
        console.log(result);
        if(result.status == 200){
          toast.success('Project added successfully')
          setTimeout(()=>{
            handleClose()
          },2000)
          setAddResponse(result)
          
        }else if(result.status == 406){
          toast.warning(result.response.data)
          handleCancel()
        }else{
          toast.error(`Something went wrong`)
          handleClose()
        }

      }else{
        toast.warning("Please login")
      }

    }
  }
  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      setToken(sessionStorage.getItem("token"))
    }
  },[])



  const handleShow = () => setShow(true);
  return (
    <>
      <button onClick={handleShow} className='btn btn-success'> Add Project </button>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-info'>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-6 d-flex align-items-center justigy-content-center">
                <label htmlFor="projectimage">
                  <input type="file" id='projectimage' className='d-none' key={key} onChange={(e) => handleFile(e)} />
                  <img src={previewImage ? previewImage : "https://th.bing.com/th/id/R.763ac784face5729e9a5274627676d3e?rik=V9UoqLQpq7HLKw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2%2fUpload-PNG.png&ehk=p9OH7uKYdCDqtmw7B%2f3GbgBjKdDyCUCllqAD6Q5nCxU%3d&risl=&pid=ImgRaw&r=0"} alt="project image" className='w-100' />

                </label>
              </div>
              <div className="col-md-6">
                <div className='mt-3'>

                  <input type="text" value={projectDetails.title} placeholder='Title' className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
                </div>
                <div className='mt-3'>
                  <input type="text" value={projectDetails.language} placeholder='Language' className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
                </div>
                <div className='mt-3'>
                  <input type="text" value={projectDetails.github} placeholder='Github' className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
                </div>
                <div className='mt-3'>
                  <input type="text" value={projectDetails.website} placeholder='Website' className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
                </div>

                <div className='mt-3'>
                  <textarea rows={5} placeholder='Overview' value={projectDetails.overview} className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}></textarea>
                </div>
              </div>
            </div>
          </div>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning me-3" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="info" onClick={handleAdd}>
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
            <ToastContainer position='top-center' theme="colored" autoClose={2000}/>
      
    </>
  )
}

export default AddProject