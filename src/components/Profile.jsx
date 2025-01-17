import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Profile() {
  return (
    <>
    <div className='shadow p-5'>
        <div className='d-flex align-items-center justify-content-between'>
            <h4 className='text-success'>Profile</h4>
            <button className='btn shadow'><FontAwesomeIcon icon={faAngleUp} /></button>
        </div>
        <div >
        <label htmlFor="profileimage" className='d-flex justify-content-center align-items-center'>
             <input type="file" id='profileimage' className='d-none' />
                            <img src="https://vpal.harvard.edu/sites/projects.iq.harvard.edu/files/styles/os_files_large/public/vpl/files/syllabus-acceptableuse.png?m=1598045026&itok=quSdE82h" alt="profile image" className='w-75'/>

                        </label>
                        <div className="w-100">
                            <div className="mb-3">
                                <input type="text" placeholder='Github' className='form-control' />
                            </div>
                            <div className="mb-3">
                            <input type="text" placeholder='LinkedIn' className='form-control' />

                            </div>
                            <div className="mb-3 text-center">
                                <button className='btn btn-info w-100'>Update Profile</button>
                            </div>
                        </div>
        </div>

    </div>
    
    </>
  )
}

export default Profile