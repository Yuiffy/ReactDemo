import React from 'react';
import PlayerZone from './playerZone.js';
import PublicZone from './publicZone.js';

import './style.css';

export default () => {
    return (
        <div className="gameBoard">
            <PlayerZone player="对手"/>
            <PublicZone />
            <PlayerZone player="你"/>
        </div>
    );
}

