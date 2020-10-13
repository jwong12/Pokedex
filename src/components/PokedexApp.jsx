import React from 'react';
import PokeCards from './PokeCards';
import { css } from 'emotion';
import '../stylesheets/PokedexApp.scss';

class PokedexApp extends React.Component {
	render() {
		return (
			<div>
				<img 
					src="./images/pokemon-banner.svg" 
					alt="Pokemon banner"
					className={css`
					width: 450px;
					padding: 20px 0;
				`}/><br/>
				<h1>Pokedex App</h1>
				<div id="search-wrapper">
					<input type="text" id="search-bar" placeholder="Search pokemon..."/>
					<div id="button-wrapper">
						<img src="./images/search.svg" id="search-button" alt="Search icon"/>
					</div>
				</div><br/>
				<PokeCards />
			</div>
		);
	}
}

export default PokedexApp;
