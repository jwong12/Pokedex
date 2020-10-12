import React from 'react';
import { css, cx } from 'emotion';
import '../stylesheets/Header.scss';

function Header() {
  return (
    <div>
      <img 
        src="./images/pokemon-banner.svg" 
        alt="Pokemon banner"
        className={css`
        width: 50%;
        max-width: 550px;
        padding: 20px 0;
      `}/><br/>
      <h1>Pokedex App</h1>
      <div id="search-wrapper">
        <input type="text" id="search-bar" placeholder="Search pokemon..."/>
        <div id="button-wrapper">
          <img src="./images/search.svg" id="search-button" alt="Search icon"/>
        </div>
      </div>
    </div>
  );
}

export default Header;
