import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Photos from '../assets/homeimage.avif'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { homeProjectApi } from '../service/allApi'


function Home() {

  const [isLogin, setIsLogin] = useState(false)
  const [homeProject, setHomeProject] = useState([])

  const getHomeProject = async () => {
    const result = await homeProjectApi()
    // console.log(result);
    setHomeProject(result.data)
  }
  console.log(homeProject);


  useEffect(() => {
    getHomeProject()
    if (sessionStorage.getItem("token")) {
      setIsLogin(true)
    }
    else {
      setIsLogin(false)
    }
  }, [])
  return (
    <>
      <div className='bg-info p-5'>
        <div className='.container-fluid mt-5'>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-6 p-4">
              <h1 className='text-light' style={{ fontSize: '70px' }}>Project fair</h1>
              <p>One stop destination for all software development projects</p>

              {isLogin == false ? <Link to={'/login'}><button className='btn text-white p-1 mt-3'>Get Started <FontAwesomeIcon icon={faRightLong} /></button></Link>
                :
                <Link to={'/dashboard'}><button className='btn text-white p-1 mt-3'>Manage Projects <FontAwesomeIcon icon={faRightLong} /></button></Link>}

            </div>
            <div className="col-md-6 mt-4">
              <img src={Photos} alt="" className='w-75 rounded-circle' />
            </div>
          </div>
        </div>

      </div>

      {/* Explore our projects */}
      <div>
        <h1 className='text-center mt-5'>Explore Our Projects</h1>
        <div className="container">
          <div className="row mt-md-5">

            {homeProject?.map((item) => (
              <div className="col-md-4"><ProductCard project={item} /></div>
            ))}
            
          </div>

        </div>
        <Link to={'/projects'} className='text-danger'><p className=' text-center mt-5'>See more Projects...</p></Link>
      </div>
    </>
  )
}

export default Home