import React from 'react';
import './../App.css';
import bitmojiImage from './../lib/images/bitmojiSelfie.png';

function PlayerDisplay(player) {

  return (
    <div class="hex-container">
        <div class="hex">
            <div class="hex inner">
                <img src={bitmojiImage} alt="Player" class="player-image"/>
            </div>
        </div>
        <div class="player-info">
            <h4 class="player-name">{player.name}</h4>
            <h6 class="player-number">{player.number}</h6>
        </div>
    </div>
  )
}

export default PlayerDisplay