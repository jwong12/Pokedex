import React from 'react';
import PokeCard from './Card';
import '../stylesheets/PokeCards.scss';

class PokeCards extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="body-content">
				<ul>
					{this.props.pokeCards.map((pokemon) => 
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
