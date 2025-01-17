import { faFacebook, faInstagram, faLinkedin, faStackOverflow, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


function Footer() {
  return (
    <>
    <div className='bg-info p-4 mt-5'>
        <div className="row">

            <div className="col-md-4">
                <h4 className='text-light me-3'><FontAwesomeIcon icon={faStackOverflow} className='text-light'/> Project Fair</h4>
                <p className='mt-3' style={{textAlign:'justify'}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus, eos fuga! Debitis, molestias. Ipsa voluptates quasi architecto alias impedit dolorum dignissimos, deserunt unde commodi laudantium perspiciatis possimus a aperiam assumenda!</p>
            </div>

            <div className="col-md-2 d-md-flex justify-content-center mt-4 mt-md-0">
            <div>
                <h4 className='text-white'>Links</h4>
                <p className='mt-3'>Home</p>
                <p>Project</p>
                <p>Dashboard</p>
            </div>
            </div>

            <div className="col-md-2 d-md-flex justify-content-center mt-4 mt-md-0">
            <div>
                <h4 className='text-white'>Guides</h4>
                <p className='mt-3'>React</p>
                <p>React Bootstrap</p>
                <p>Bootswatch</p>
              </div>
            </div>

            <div className="col-md-4 md:px-5 mt-4 mt-md-0">
            <h4 className='text-white'>Contact Us</h4>
            <div className=" d-flex mt-3">
                <input type="text" placeholder='Email Id' className='form-control'/>
                <button className='btn btn-warning ms-3'>Subscribe</button>
            </div>

            <div className="d-flex justify-content-between mt-4">
                <FontAwesomeIcon icon={faInstagram} className='fa-2x text-light' />
                <FontAwesomeIcon icon={faXTwitter} className='fa-2x text-light'/>
                <FontAwesomeIcon icon={faFacebook} className='fa-2x text-light'/>
                <FontAwesomeIcon icon={faLinkedin} className='fa-2x text-light'/>
              </div>

            </div>
        </div>
    </div>


    </>
  )
}

export default Footer