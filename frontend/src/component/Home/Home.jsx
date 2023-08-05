import React from 'react'
import Header from '../navbar/header/Header'
import Intensity from '../intensity/Intensity'
import StartYear from '../startYear/StartYear'
import Pestle from '../chart/Pestle'
import Region from '../region/Region'
import Country from '../mapChart/Country'
import './home.css'
import Topic from '../mapChart/Topic'
import EndYear from '../endYear/EndYear'
import Sector from '../chart/Sector'

const Home = () => {

  return (
    <>
      <Header />
      <div className='container'>
        <div className="upper">
          <Intensity />
          <StartYear />
          <Pestle />
        </div>
        <div className='lineChart'>
          <Region />
          <Country />
          <Topic />
        </div>
        <div className='lower'>
          <EndYear />
          <Sector />
        </div>
      </div>
    </>
  )
}

export default Home