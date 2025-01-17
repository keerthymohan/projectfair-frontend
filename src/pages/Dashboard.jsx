import React from 'react'
import LoginHead from '../components/LoginHead'
import MyProjects from '../components/MyProjects'
import Profile from '../components/Profile'

function Dashboard() {
  return (
    <>
    <LoginHead/>
    <div className="p-4 mt-5">
      <h3 className='mt-3'>Welcome <span className='text-warning'>user</span></h3>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-8">
            <MyProjects/>
          </div>
          <div className="col-md-4">
            <Profile/>
          </div>
        </div>
      </div>

    </div>

    </>
  )
}

export default Dashboard