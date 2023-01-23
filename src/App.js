import React from 'react';
import { useState } from 'react';
import './main.css';
const P = require("./pokemon.js");
const POKEMON = P.POKEMON;

function Pokemon(props) {
    return (
        <img className="mon" src={"" + props.url} alt="mon" onClick={props.onClick}/>
    )
}

class Guesser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guess: "",
        }
    }

    handleChange(event) {
        this.setState( {guess: event.target.value } );
    };


    render() {
        return (
            <div>
                <form>
                    <input type="text" value={this.state.guess} onChange={(event) => this.handleChange(event)}/>
                </form>
            <p>{this.state.guess ? this.state.guess : "Type to start"}</p>
            <p>{this.props.correct !== this.state.guess ? this.props.correct : "Correct!!!!!!!!!!!!!"}</p>
            </div>
        )

    }
}

class HintButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            used: false,
            text: "Hint!"
        }
        
    }

    handleClick(event) {
        if(!this.state.used) {
            this.setState( {used: true, text: this.props.theHint} )
        }
    }

    render() {
        return (
            <button onClick={(e) => this.handleClick(e)}>
                {this.state.text}
            </button>
        )
    }
}


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dexNumber: this.getRandomDexNumber()
        }
        this.handleClick = this.handleClick.bind(this);
        
        
    }

    getRandomDexNumber() {
        return Math.floor(Math.random() * 898);
    }

    handleClick() {
        console.log(this.state);
    }


    render() {
        return(
            <div>
                <Pokemon url={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + (this.state.dexNumber + 1) + ".png"}
                        onClick={() => this.handleClick()}/>
                <Guesser correct={POKEMON[this.state.dexNumber].toLowerCase()}/>
                <HintButton theHint={"This Pokemon's dex number is " + this.state.dexNumber}/>
            </div>
        );
    }

}




export default Game;
