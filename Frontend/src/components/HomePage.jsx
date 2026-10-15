import React from 'react';
import Img3 from "../img/img3.jpg";
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='main-home'>
      <h1 className="title is-1 card-header-title is-centered">Secret Firm savehub</h1>
      <div className="tile">
        <figure className="image">
          <img src={Img3} alt="Group savings" />
        </figure>
      </div>

      <div className="buttons">
        <Link to="/" className="button is-link">Get Started</Link>
      </div>
    </div>
  )
}

export default HomePage
