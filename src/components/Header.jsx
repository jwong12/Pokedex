import React from 'react';
import { css, cx } from 'emotion';

function Header() {
  return (
    <div>
      <h1>Pokedex App</h1>
      <img 
        src="./images/pokemon-banner.svg" 
        alt="Pokemon Banner"
        className={css`
        width: 50%;
        max-width: 550px;
      `}/><br/>
      <input type="text" placeholder="Search"/>
    </div>
  );
}

export default Header;
