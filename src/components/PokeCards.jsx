import React from 'react';
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
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=5';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({pokeData: data.results}))
      .then(() => {
        const { pokeData } = this.state;

        for (let item of pokeData) {
          fetch('https://pokeapi.co/api/v2/pokemon/' + item.name)
          .then((response) => response.json())
          .then((data) => {
            const { cards } = this.state;
            const copyArray = [...cards];
            copyArray.push(data);
            this.setState({ cards: copyArray })
          })
          .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div id="body-content">
        
      </div>
    );
  }
}

export default PokeCards;
