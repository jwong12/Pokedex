import React from 'react';
import PokeCards from './PokeCards';
import { css } from 'emotion';
import '../stylesheets/PokedexApp.scss';

class PokedexApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pokeData: [],
			cards: []
		};
	}

	componentDidMount() {
		this.fetchPokemonNames();
	}

	fetchPokemonNames() {
		const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=' + Math.floor(Math.random() * 500) +'&limit=10';
		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => this.setState({pokeData: data.results}))
			.then(() => {
				const { pokeData } = this.state;

				for (let item of pokeData) {
					this.fetchPokemonDetails(item.name);
				}
			})
			.catch((err) => console.log(err));
	}

	fetchPokemonDetails(name) {
		fetch('https://pokeapi.co/api/v2/pokemon/' + name)
			.then((response) => response.json())
			.then((data) => {
				const { cards } = this.state;
				const pokemonArray = [...cards];
				pokemonArray.push(data);
				this.setState({ cards: pokemonArray })
			})
			.catch((err) => console.log(err));
	}

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
				<PokeCards pokeCards={this.state.cards} />
			</div>
		);
	}
}

export default PokedexApp;
