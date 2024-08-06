 
import './home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import { useState } from 'react'
import ShowFoods from '../../components/showFoods/ShowFoods'
import Footer from '../../components/Footer/Footer'
import AppDownload from '../../components/AppDownload/AppDownload'
 
 

const Home = () => {
  const[category,setCategory]=useState('All');
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
 
      <ShowFoods category={category} />
      <AppDownload/>
   
    </div>
  )
}

export default Home
