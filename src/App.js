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
        this.state = {
            dexNumber: this.getRandomDexNumber(),
            guess: "",
            hintMessage: "",
            hintDisabled: false
        }
        this.handleImageClick = this.handleImageClick.bind(this);
        this.handleHintClick = this.handleHintClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        
        
    }

    getRandomDexNumber() {
        return Math.floor(Math.random() * 898);
    }

    handleImageClick() {
        this.setState( {dexNumber: this.getRandomDexNumber(), 
                        guess:"", 
                        hintMessage: ""} )
    }

    handleHintClick() {
        this.setState( {hintMessage: "This Pokemon's dex number is " + this.state.dexNumber}  );
    }

    handleInputChange(event) {
        this.setState( {guess: event.target.value } );
    };


    render() {
        return (
            <div>
                <Pokemon url={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + (this.state.dexNumber + 1) + ".png"}
                        onClick={() => this.handleImageClick()}/>
                        
            <div>
                <form>
                    <input type="text" value={this.state.guess} onChange={(event) => this.handleInputChange(event)}/>
                </form>
                <p>{this.state.guess ? this.state.guess : "Type to start"}</p>
                <p>{POKEMON[this.state.dexNumber] !== this.state.guess ? POKEMON[this.state.dexNumber] : "Correct!!!!!!!!!!!!!"}</p>
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
