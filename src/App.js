import React from 'react';
import './main.css';
const P = require("./pokemon.js");
const POKEMON = P.POKEMON;

function Pokemon(props) {
    return (
        <img className="mon" src={"" + props.url} alt="mon" onClick={props.onClick}/>
    )
}

const getGeneration = (dexNumber) => {
        if(dexNumber <= 151 && dexNumber > 0) {
            return 1
        } else if(dexNumber <= 251) {
            return 2
        } else if(dexNumber <= 386) {
            return 3
        } else if(dexNumber <= 493) {
            return 4
        } else if(dexNumber <= 649) {
            return 5
        } else if(dexNumber <= 721) {
            return 6
        } else if(dexNumber <= 809) {
            return 7
        } else if(dexNumber <= 906) {
            return 8
        } else if(dexNumber <= 1008) {
            return 9
        } else {
            return -1
        }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        let dex = this.getRandomDexNumber()

        console.log(dex)

        this.state = {
            dexNumber: dex,
            guess: "",
            hintMessage: "",
            hintDisabled: false,
            lineText: this.getInitialLineText(dex),
            score: 0,
            timeLeft: 30,
            combo: 0
            
        }
        this.handleImageClick = this.handleNewPokemon.bind(this);
        this.handleHintClick = this.handleHintClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.timer = 0;
        
    }

    // TODO Buffer loading image
    getRandomDexNumber() {
        return Math.floor(Math.random() * 1008) + 1;
    }

    getInitialLineText(dex) {
        let s = ""
        for(let i = 0; i < POKEMON[dex].length; i++) {
            s += "_ ";
        }
        return s.trim();
    }

    handleNewPokemon(resetCombo) {
        let newDex = this.getRandomDexNumber();
        this.setState( {dexNumber: newDex, 
                        guess:"", 
                        hintMessage: "",
                        lineText: this.getInitialLineText(newDex)} )

        if(resetCombo) this.setState( {combo: 0} ) 
    }

    handleHintClick() {
        this.setState( {hintMessage: "This Pokemon's from Generation " + (getGeneration(this.state.dexNumber)),
                        lineText: POKEMON[this.state.dexNumber][0] + this.state.lineText.slice(1, -1) + POKEMON[this.state.dexNumber][POKEMON[this.state.dexNumber].length - 1]
                        } );
    }

    handleInputChange(event) {
        this.setState( {guess: event.target.value } );
    };

    // TODO Change setinterval to something more optimal
    handleSubmit(event) {
        event.preventDefault();
        console.log(event.target[0].value);

        let guess = event.target[0].value.toLowerCase();
        let correct = POKEMON[this.state.dexNumber]


        if (guess === "") {
            this.handleNewPokemon();
            this.setState( {combo: 0} )

        } else if(guess === correct) {
            this.setState( {score: this.state.score + 1, combo: this.state.combo + 1} )
            this.handleNewPokemon(false);

        } else {
            let s = ""
            for(let i = 0; i < correct.length; i++) {
                s += ((guess[i] === correct[i] || this.state.lineText[i*2] !== "_") ? correct[i] + " " : "_ ")
            }
            this.setState( {lineText: s.trim(), combo: 0} ) 
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

    isRed() {
        if(this.state.timeLeft > 10 || this.state.timeLeft % 2 === 1) return ""
        return "red"
    }


    render() {
        this.startTimer();

        return (
            <div>
                <div className="text-array">
                    <h2>{"Score: " + this.state.score}</h2>
                    <h2 className={(this.state.timeLeft <= 10 && this.state.timeLeft % 2 === 0) ? "red" : ""}>{this.state.timeLeft}</h2>
                </div>

                <Pokemon url={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + (this.state.dexNumber) + ".png"}
                        onClick={() => this.handleNewPokemon(true)}/>
                        
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.guess} onChange={(event) => this.handleInputChange(event)}/>
                </form>
                <p className="linetext">{this.state.lineText}</p>
            </div>
            <div className="button-array">
                <button onClick={() => this.handleNewPokemon(true)}>
                    {"Pass"}
                </button>
                <button onClick={() => this.handleHintClick()}>
                    {"Hint"}
                </button>
                
            </div>
            <h3>{this.state.hintMessage}</h3>
            <p className="combo" key={this.state.combo}>{this.state.combo <= 1 ? null : this.state.combo + "x Combo!"}</p>
            </div>
        );
    }

}




export default Game;
