import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../service/serviceUrl';

function EditProject({ projects }) {
  const [show, setShow] = useState(false);
  console.log(projects);

  const [preview, setPreview] = useState("")

  const [projectDetails, setProjectDetails] = useState({
    title: projects.title,
    language: projects.language,
    github: projects.github,
    website: projects.website,
    overview: projects.overview,
    projectImage: ""
  })
  console.log(projectDetails);
  const [key,setKey] = useState(1)

  const handleFile = (e) => {
    console.log(e.target.files);
    setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })

  }

  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage))

    }
  }, [projectDetails.projectImage])

  const handleCancel = () => {
    setProjectDetails({
      title: projects.title,
      language: projects.language,
      github: projects.github,
      website: projects.website,
      overview: projects.overview,
      projectImage: ""

    })
    setPreview("")
    if(key==0){
      setKey(1)
    }else{
      setKey(0)

    }

  }


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <FontAwesomeIcon icon={faPenToSquare} onClick={handleShow} className='me-3 text-info' />

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-info'>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-6 d-flex align-items-center justigy-content-center">
                <label htmlFor="projectimage">
                  <input key={key} type="file" onChange={(e) => handleFile(e)} id='projectimage' className='d-none' />
                  <img src={preview ? preview : `${serverUrl}/upload/${projects.projectImage}`} className='w-100' />

                </label>
              </div>
              <div className="col-md-6">
                <div className='mt-3'>
                  <input type="text" onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} value={projectDetails.title} placeholder='Title' className='form-control' />
                </div>
                <div className='mt-3'>
                  <input type="text" onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} value={projectDetails.language} placeholder='Language' className='form-control' />
                </div>
                <div className='mt-3'>
                  <input type="text" onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} value={projectDetails.github} placeholder='Github' className='form-control' />
                </div>
                <div className='mt-3'>
                  <input type="text" onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} value={projectDetails.website} placeholder='Website' className='form-control' />
                </div>

                <div className='mt-3'>
                  <textarea rows={5} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} value={projectDetails.overview} placeholder='Overview' className='form-control'></textarea>
                </div>
              </div>
            </div>
          </div>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning me-3" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="info" onClick={handleClose}>
            UPDATE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProject