import React from 'react'
import { Link } from 'react-router-dom'

function Pagenotfound() {
  return (
    <>
      <div className='p-5'>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 d-flex justify-content-center align-items-center flex-column">
            <img src="https://i.pinimg.com/originals/a3/59/56/a35956ec9f42082d3eeee4ba1b506060.gif" alt="page not found" className='w-50' style={{height:'400px'}}/>
            <h1>Look like you're lost</h1>
            <h4 >The page you are looking is unavailable</h4>
            <Link to={'/'}><button className='btn btn-success rounded mt-2'>GO HOME</button></Link>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </>
  )
}

export default Pagenotfound