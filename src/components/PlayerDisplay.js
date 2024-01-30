import React from 'react';
import './../App.css';
import bitmojiImage from './../lib/images/bitmojiSelfie.png';

function PlayerDisplay({id, name, number, bitmoji, goals, assists, mom, apps, showBanner}) {

  return (
    <div className={`d-flex ${showBanner ? 'banner' : ''}`}>
      <div className="hex-container">
          <div className="hex">
              <div className="hex inner">
                  <img src={bitmojiImage} alt="Player" className="player-image"/>
              </div>
          </div>
          <div className="player-info">
              <h4 className="player-name">{name}</h4>
              <h6 className="player-number">{number}</h6>
          </div>
      </div>
      {showBanner ? 
        <div className="d-flex w-100 justify-content-center flex-column align-items-center">
          <h6> Apps: {apps}</h6>
          <h6> Goals: {goals}</h6>
          <h6> Assists: {assists} </h6>
          <h6> Mom: {mom}</h6>
        </div>
        :
        <></>
      }
      
    </div>
  )
}

export default PlayerDisplay