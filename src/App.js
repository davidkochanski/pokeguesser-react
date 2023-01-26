import React from 'react';
import './main.css';
const P = require("./pokemon.js");
const POKEMON = P.POKEMON;

function Pokemon(props) {
    return (
        <img className="mon" src={"" + props.url} alt="mon" onClick={props.onClick}/>
    )
}

// class Guesser extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             guess: "",
//         }
//     }




//     render() {
//         return (
//             <div>
//                 <form>
//                     <input type="text" value={this.state.guess} onChange={(event) => this.handleChange(event)}/>
//                 </form>
//             <p>{this.state.guess ? this.state.guess : "Type to start"}</p>
//             <p>{this.props.correct !== this.state.guess ? this.props.correct : "Correct!!!!!!!!!!!!!"}</p>
//             </div>
//         )

//     }
// }

// class HintButton extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             text: "Hint!",
//             disabled: this.props.disabled
//         }
        
//     }

//     handleClick(event) {
//         console.log(this.state);
//         this.setState( {text: this.props.theHint, disabled: true} )
//     }

//     render() {
//         return (
//             <button onClick={(e) => this.handleClick(e)}>
//                 {this.state.text}
//             </button>
//         )
//     }
// }


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
            score: 0
            
        }
        this.handleImageClick = this.handleNewPokemon.bind(this);
        this.handleHintClick = this.handleHintClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
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


        if (event.target[0].value === "") {
            this.handleNewPokemon();

        } else if(event.target[0].value === POKEMON[this.state.dexNumber]) {
            this.setState( {score: this.state.score + 1} )
            this.handleNewPokemon();

        } else {
            let s = ""
            for(let i = 0; i < POKEMON[this.state.dexNumber].length; i++) {
                s += (event.target[0].value[i] === POKEMON[this.state.dexNumber][i] ? POKEMON[this.state.dexNumber][i] + " " : "_ ")
            }
            this.setState( {lineText: s} ) 
        }

    
    }


    render() {
        return (
            <div>
                <h2>{"Score: " + this.state.score}</h2>
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
