import Pokemon from './components/pokemon'

import 'bootswatch/dist/sandstone/bootstrap.css'
import React from 'react';

import axios from 'axios'

class App extends React.Component {
  state = {
    pokemons: [],
    filtered: [],
    search: ''
  }

  componentDidMount() {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
      .then(resp => {
        let pokemons = resp.data.results;
        let filtered = resp.data.results;
        this.setState({ pokemons, filtered })
      });
  }

  buscar = () => {
    let filtered = this.state.pokemons;
    if (this.state.search) {
      filtered = this.state.pokemons.filter(p => p.name.startsWith(this.state.search))
    }
    this.setState({ filtered })
  }

  renderRow(pokemon, index) {
    return (
      <Pokemon key={pokemon.url} name={pokemon.name} url={pokemon.url} num={index + 1}></Pokemon>
    )
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">

            <div className="card border-danger mb-3">
              <div className="card-header text-center"><h1>Pokedex</h1></div>
              <div className="card-body mx-auto">
                <img src={process.env.PUBLIC_URL + '/pokeball.png'} height="200" width="200" alt="Pokeball" />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-8">
                <input type="text" className="form-control" id="inputSearch" name="search" onChange={e => this.setState({search:e.target.value})} placeholder="Pesquisar" />
              </div>
              <div className="col-md-4">
                <button type="button" className="form-control btn btn-info" style={{ float: "right" }} onClick={this.buscar} >Buscar</button>
              </div>
            </div>

            {this.state.filtered.map(this.renderRow)}

          </div>
        </div>
      </div>
    );
  }
}

export default App;