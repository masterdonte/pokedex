
import React from 'react'
import axios from 'axios'

class Pokemon extends React.Component {

    state = {
        isFront: true,
        currentImg: '',
        pokemon: {
            id:"",
            type: "",
            front: "",
            back: "",
        }
    }

    componentDidMount() {
        axios.get(this.props.url).then((res) => {
            let pokemon = {
                id : res.data.id, 
                type: res.data.types[0].type.name,
                front: res.data.sprites.front_default,
                back: res.data.sprites.back_default
            }
            this.setState({ pokemon, currentImg: pokemon.front })
        });
    }

    trocarSprite = () => {
        if(this.state.isFront){
            this.setState({isFront: false, currentImg: this.state.pokemon.back})
        }else{
            this.setState({isFront: true, currentImg: this.state.pokemon.front})
        }
    }

    render() {
        return (
            <div className="card mb-3">
                <h3 className="card-header d-flex justify-content-center">{this.state.pokemon.id} - {this.props.name}</h3>
                <div className="card-body d-flex justify-content-center">
                    <img src={this.state.currentImg} alt={this.props.name} />
                </div>                               
                <div className="card-footer text-muted">
                    <button type="button" className="form-control btn btn-outline-success" onClick={this.trocarSprite} >Trocar Sprite</button>
                </div>
            </div>
        )
    }
}

export default Pokemon;