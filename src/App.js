import React from 'react';
import './main.css';
const P = require("./pokemon.js");
const POKEMON = P.POKEMON;

function Pokemon(props) {
    return (
        <img className="mon" src={"" + props.url} alt="mon" onClick={props.onClick}/>
    )
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        let dex = this.getRandomDexNumber()

        this.state = {
            dexNumber: dex,
            guess: "",
            hintMessage: "",
            hintDisabled: false,
            lineText: this.getInitialLineText(dex),
            score: 0,
            timeLeft: 100
            
        }
        this.handleImageClick = this.handleNewPokemon.bind(this);
        this.handleHintClick = this.handleHintClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.timer = 0;
        
    }

    getRandomDexNumber() {
        return Math.floor(Math.random() * 898);
    }

    getInitialLineText(dex) {
        let s = ""
        for(let i = 0; i < POKEMON[dex].length; i++) {
            s += "_ ";
        }
        return s.trim();
    }

    handleNewPokemon() {
        let newDex = this.getRandomDexNumber();
        this.setState( {dexNumber: newDex, 
                        guess:"", 
                        hintMessage: "",
                        lineText: this.getInitialLineText(newDex)} )
    }

    handleHintClick() {
        this.setState( {hintMessage: "This Pokemon's dex number is " + this.state.dexNumber}  );
    }

    handleInputChange(event) {
        this.setState( {guess: event.target.value } );
        
    };

    handleSubmit(event) {
        event.preventDefault();
        console.log(event.target[0].value);

        let guess = event.target[0].value.toLowerCase();
        let correct = POKEMON[this.state.dexNumber]


        if (guess === "") {
            this.handleNewPokemon();

        } else if(guess === correct) {
            this.setState( {score: this.state.score + 1} )
            this.handleNewPokemon();

        } else {
            let s = ""
            for(let i = 0; i < correct.length; i++) {
                s += (guess[i] === correct[i] ? correct[i] + " " : "_ ")
            }
            this.setState( {lineText: s} ) 
        }

    
    }

    countDown() {
        this.setState( {timeLeft: this.state.timeLeft - 1} );
        
        if (this.state.timeLeft === 1) {
            clearInterval(this.timer);
        }

    }

    startTimer() {
        if (this.timer === 0 && this.state.timeLeft > 0) {
            this.timer = setInterval(this.countDown, 1000);
          }
    }


    render() {
        this.startTimer();

        return (
            
            <div>
                <h2>{"Score: " + this.state.score}</h2>
                <h2>{this.state.timeLeft}</h2>
                <Pokemon url={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + (this.state.dexNumber + 1) + ".png"}
                        onClick={() => this.handleNewPokemon()}/>
                        
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.guess} onChange={(event) => this.handleInputChange(event)}/>
                </form>
                <h2>{this.state.lineText}</h2>
                {/* <p>{POKEMON[this.state.dexNumber] !== this.state.guess ? POKEMON[this.state.dexNumber] : "Correct!!!!!!!!!!!!!"}</p> */}
            </div>
                <button onClick={() => this.handleHintClick()}>
                    {"Click for hint!"}
                </button>
                &nbsp; {this.state.hintMessage}
            </div>
        );
    }

}




export default Game;
