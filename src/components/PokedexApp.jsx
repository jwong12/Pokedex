import React from 'react';
import PokeCards from './PokeCards';
import { css } from 'emotion';
import '../stylesheets/PokedexApp.scss';

class PokedexApp extends React.Component {
	constructor(props) {
		super(props);
		this.wrapperRef = React.createRef();
		this.state = {
			pokeData: [],
			pokeNames: [],
			cards: [],
			suggestions: [],
			text: '',
		};

		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleSearchClick = this.handleSearchClick.bind(this);
		this.renderSuggestions = this.renderSuggestions.bind(this);
        this.closeSuggestions = this.closeSuggestions.bind(this);
	}

	componentDidMount() {
		this.fetchPokemonNames();
		document.addEventListener('mousedown', this.closeSuggestions);
	}

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.closeSuggestions);
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
		const { pokeNames } = this.state;
		const pokemonCards = [];

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
				const pokemonCards = [];
				pokemonCards.push(data);
				this.setState({ cards: pokemonCards });
			})
			.catch((err) => console.log(err));
	}

	handleTextChange(e) {
		const value = e.target.value;
		let suggestions = [];
        
        if(value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
			suggestions = this.state.pokeNames.sort().filter(v => regex.test(v));

			// The number of random pokemons displayed is set to 10
            suggestions = suggestions.slice(0,10); 
		}

		this.setState(() => ({ suggestions, text: value }));
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
			this.fetchPokemonDetails(text.toLowerCase().trim(), false);
		}
	}

	suggestionSelected (value) {
        this.setState(() => ({ 
            text: value,
            suggestions: []
        }), () => this.handleSearchClick());
	}

	renderSuggestions() {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => 
                    <li key={item} onClick={() => this.suggestionSelected(item)}>{item}</li>
                )}
            </ul>
        );
	}
	
	closeSuggestions(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState(() => ({ 
                suggestions: []
            }));
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
				<div id="search-wrapper" ref={this.wrapperRef} >
					<div id="search-container">
						<input 
							type="text" 
							value={this.state.text}
							onChange={this.handleTextChange}
							onKeyPress={this.handleKeyPress}
							id="search-bar" 
							placeholder="Search pokemon..."
							autoComplete="off"
						/>
						<div id="button-wrapper">
							<img 
								src="./images/search.svg" 
								onClick={this.handleSearchClick}
								id="search-button" 
								alt="Search icon"
							/>
						</div>
					</div>
					{this.renderSuggestions()}
				</div><br/>
				<PokeCards pokeCards={this.state.cards} />
			</div>
		);
	}
}

export default PokedexApp;
