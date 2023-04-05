import React from 'react';
import Img3 from "../img/img3.jpg";
import Login  from "../components/Login";
import { Link } from 'react-router-dom';



const HomePage = () => {
  return (
   <div className='main-home'> 
    <h1 class=" title is-1 card-header-title is-centered">Secret Firm savehub</h1>
  <div class="tile ">
   <figure class="image">
    <img src={Img3} alt="" />
   </figure>
  </div>
   
  <Link to={Login}>
  <div class="buttons">
  <button  class="button is-link" onClick={Login}>Get Started</button>
  </div>
    </Link>
  


</div>
  )
}

export default HomePage