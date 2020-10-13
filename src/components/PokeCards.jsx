import React from 'react';
import PokeCard from './Card';
import '../stylesheets/PokeCards.scss';

class PokeCards extends React.Component {
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
			<div id="body-content">
				<ul>
					{this.state.cards.map((pokemon) => 
						<li key={pokemon.id}>
							<PokeCard {...pokemon} />
						</li>
					)}
				</ul>
			</div>
		);
	}
}

export default PokeCards;
