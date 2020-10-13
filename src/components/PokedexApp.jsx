import React from 'react';
import PokeCards from './PokeCards';
import { css } from 'emotion';
import '../stylesheets/PokedexApp.scss';

class PokedexApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pokeData: [],
			pokeNames: [],
			cards: [],
			text: '',
		};

		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleSearchClick = this.handleSearchClick.bind(this);
	}

	componentDidMount() {
		this.fetchPokemonNames();
	}

	fetchPokemonNames() {
		const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1050';
		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => this.setState({ pokeData: data.results }))
			.then(() => {
				const { pokeData } = this.state;
				const pokeNames = [];

				for (let item of pokeData) {
					pokeNames.push(item.name);
				}
				this.setState({ pokeNames });
			})
			.then(() => this.fetchRandomPokemons())
			.catch((err) => console.log(err));
	}

	fetchRandomPokemons() {
		const { pokeNames, cards } = this.state;
		const pokemonCards = [];
		console.log(pokeNames)
		for (let i = 0; i < 10; i++) {
			fetch('https://pokeapi.co/api/v2/pokemon/' + pokeNames[Math.floor(Math.random() * pokeNames.length)])
				.then((response) => response.json())
				.then((data) => {					
					pokemonCards.push(data);
					this.setState({ cards: pokemonCards });
				})
				.catch((err) => console.log(err));
		}
	}

	fetchPokemonDetails(name) {
		fetch('https://pokeapi.co/api/v2/pokemon/' + name)
			.then((response) => response.json())
			.then((data) => {
				const { cards } = this.state;
				const pokemonCards = [];
				pokemonCards.push(data);
				this.setState({ cards: pokemonCards });
			})
			.catch((err) => console.log(err));
	}

	handleTextChange(e) {
		const value = e.target.value;
		this.setState(() => ({ text: value }));
	}

	handleKeyPress(e) {
		if(e.key === 'Enter'){
			this.handleSearchClick();
		}
	}

	handleSearchClick() {
		const { text } = this.state;

		if (text.trim() === "") {
			this.fetchRandomPokemons();
		} else {
			console.log(text.toLowerCase().trim()); //
			this.fetchPokemonDetails(text.toLowerCase().trim(), false);
		}
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
					<input 
						type="text" 
						value={this.state.text}
						onChange={this.handleTextChange}
						onKeyPress={this.handleKeyPress}
						id="search-bar" 
						placeholder="Search pokemon..."
					/>
					<div id="button-wrapper">
						<img 
							src="./images/search.svg" 
							onClick={this.handleSearchClick}
							id="search-button" 
							alt="Search icon"/>
					</div>
				</div><br/>
				<PokeCards pokeCards={this.state.cards} />
			</div>
		);
	}
}

export default PokedexApp;
