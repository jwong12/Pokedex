import React from 'react';
import { Line } from 'rc-progress';
import { css } from 'emotion';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import '../stylesheets/Card.scss';

class Card extends React.Component {
	constructor(props) {
		super(props);

		this.getSprites = this.getSprites.bind(this);
		this.getBgColorFromType = this.getBgColorFromType.bind(this);
	}

	getSprites(obj) {
		const spriteLinks = [];

		for (const property in obj) {
			if (property !== "other" && property !== "versions" && obj[property] !== null) {
				spriteLinks.push(obj[property]);
			}
		}
		spriteLinks.reverse();
		
		return (
			<AwesomeSlider>
				{spriteLinks.map((link) => 
					<div key={link} data-src={link} />
				)}
			</AwesomeSlider>
		);
	}

	getBgColorFromType(type) {
		switch (type.name) {
			case 'fairy':
				return '#ff8fbd';
			case 'psychic':
			case 'poison':
			case 'ghost':
				return '#deb8f7';
			case 'grass':
			case 'bug':
				return '#84ce84';
			case 'fire':
				return '#ff8686';
			case 'ice':
			case 'water':
				return '#a8dfff';
			case 'rock':
			case 'steel':
				return '#c5c4bc';
			case 'electric':
				return '#ffec8f';
			case 'flying':
			default:
				return '#f1f1f1';
		}
	}

	render() {
		return (
			<div id="card-wrapper"
				className={css`
				background-color: ${this.getBgColorFromType(this.props.types[0].type)} 
			`}>
				<span id="poke-title">{this.props.name.substring(0, 1).toUpperCase() + this.props.name.substring(1)}</span><br/>
				{ this.getSprites(this.props.sprites) }
				<div id="description-wrapper">
					<div className="description-item">
						<span className="left-column">Health:</span>
						<div className="right-column-line">
							<Line percent={this.props.stats[0].base_stat} strokeWidth="8" strokeColor="#e30000" trailWidth="8"/>
						</div>
					</div>
					<div className="description-item">
						<span className="left-column">Speed:</span>
						<div className="right-column-line">
							<Line percent={this.props.stats[5].base_stat} strokeWidth="8" strokeColor="#8500de" trailWidth="8"/>
						</div>
					</div>
					<div className="description-item">
						<span className="left-column">Abilities:</span>
						<div className="right-column">
							{this.props.abilities.map((item) => 
								<p key={item.ability.name}
									className={css`
									font-weight: bold; 
								`}>
									{item.ability.name.substring(0, 1).toUpperCase() + item.ability.name.substring(1)}
								</p>
							)}
						</div>
					</div>
					<div className="description-item">
						<span className="left-column">Attack/Defense:</span>
						<div className="right-column">
							<span>{this.props.stats[1].base_stat}/{this.props.stats[2].base_stat}</span>
						</div>
					</div>
					<div className="description-item">
						<span className="left-column">Special-Atk/Def:</span>
						<div className="right-column">
							<span>{this.props.stats[3].base_stat}/{this.props.stats[4].base_stat}</span>
						</div>
					</div>
					<div className="description-item">
						<span className="left-column">Height:</span>
						<div className="right-column">
							<span>{this.props.height < 12 
								? this.props.height + ' in' 
								: (this.props.height / 12).toFixed() + ' ft ' 
									+  (this.props.height % 12 === 0 ? '' : this.props.height % 12 + ' in')
							}</span>
						</div>
					</div>
					<div className="description-item">
						<span className="left-column">Weight:</span>
						<div className="right-column">
							<span>{this.props.weight} lbs</span>
						</div>
					</div>
					<div className="description-item">
						<span className="left-column">Types:</span>
						<div className="right-column">
							{this.props.types.map((item) => 
								<p key={item.type.name}
									className={css`
									font-weight: bold; 
								`}>
									{item.type.name.substring(0, 1).toUpperCase() + item.type.name.substring(1)}
								</p>
							)}
						</div>
					</div>
				</div>	
			</div>
		);
	}
}

export default Card;