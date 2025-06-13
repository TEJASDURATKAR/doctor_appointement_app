import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'


const Home = () => {
  return (
    <div>
      <Header/><hr />
      <SpecialityMenu/><hr />
      <TopDoctors/><hr />
      <Banner/>
      
    </div>
  )
}

export default Home
