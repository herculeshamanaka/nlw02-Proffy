import React from 'react';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import teachIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

function Landing() {
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy" />
          <h2>Your online study plataform.</h2>
        </div>

        <img 
          src={landingImg} 
          alt="Study plataform" 
          className="hero-image"
        />

        <div className="buttons-container">
          <a href="http://aaa" className="study">
            <img src={studyIcon} alt="Study"/>
            Study
          </a>

          <a href="http://aaa" className="teach-classes">
            <img src={teachIcon} alt="Teach"/>
            Teach
          </a>

        </div>
        
        <span className="total-connections">
          200 conections already made
          <img src={purpleHeartIcon} alt="Purple heart"/>
        </span>
      </div>

    </div>
  )
}

export default Landing;