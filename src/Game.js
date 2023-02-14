import React from 'react';

const P = require("./pokemon.js");
const POKEMON = P.POKEMON;


function Pokemon(props) {
    return (
        <img className={"mon glass"} src={"" + props.url} alt="" onClick={props.onClick}/>
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

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        let dex = this.getRandomDexNumber()

        this.state = {
            dexNumber: dex,
            guess: "",
            hintMessage: "",
            hintDisabled: false,
            lineText: this.getInitialLineText(dex),
            initialTime: this.props.initialTime,
            difficulty: this.props.difficultyText,

            score: 0,
            combo: 0,
            maxCombo: 0,
            monsSkipped: 0,
            monsGuessed: 0,
            hintsTaken: 0,
            shake: false,
            check: false
            
        }
        this.handleImageClick = this.newPokemon.bind(this);
        this.handleHintClick = this.handleHintClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    getRandomDexNumber() {
        if (this.props.difficulty === "Easy") {
            return Math.floor(Math.random() * 151) + 1;
        } else {
            return Math.floor(Math.random() * 1008) + 1;
        }
    }

    getInitialLineText(dex) {
        let s = ""
        for(let i = 0; i < POKEMON[dex].length; i++) {
            s += "_ ";
        }
        return s.trim();
    }

    newPokemon(resetCombo) {
        let newDex = this.getRandomDexNumber();
        this.setState( {dexNumber: newDex, 
                        guess:"", 
                        hintMessage: "",
                        lineText: this.getInitialLineText(newDex)} )

        if(resetCombo) this.setState( {combo: 0, monsSkipped: this.state.monsSkipped + 1} ) 
    }

    handleHintClick() {
        this.setState( {hintMessage: "This Pokemon's from Generation " + (getGeneration(this.state.dexNumber))} );

        let mon = POKEMON[this.state.dexNumber]
        let end = mon.length - 1

        let txt = this.state.lineText;

        // If no blanks are fulled, fill the first and last one
        if(txt[0] === "_" && txt[txt.length-1] === "_") {

            this.setState( {lineText: mon[0] + txt.slice(1, -1) + mon[end], hintsTaken: this.state.hintsTaken + 1} )
        
        // If a blank was already filled, instead fill the left-most still not filled blank
        } else {
            let idx = txt.indexOf("_");
            
            if(idx !== -1) {
                this.setState( {lineText: txt.substring(0, idx) + mon[idx/2] + txt.substring(idx + 1, txt.length),
                                combo: 0, 
                                hintsTaken: this.state.hintsTaken + 1})
            }
        }
    }

    handleInputChange(event) {
        this.setState( {guess: event.target.value } );
    }

    handleSubmit(event) {
        event.preventDefault();
        let guess = event.target[0].value.toLowerCase();
        let correct = POKEMON[this.state.dexNumber]

        // Empty input, skip shorthand
        if (guess === "") {
            this.newPokemon();
            this.setState( {combo: 0, monsSkipped: this.state.monsSkipped + 1} )
        
        // Correct input, update stats and get new Pokemon
        } else if(guess === correct) {
            this.setState( {check: true} );
            this.setState( {score: this.state.score + 1, combo: this.state.combo + 1, monsGuessed: this.state.monsGuessed + 1} )
            if(this.state.combo > this.state.maxCombo) this.setState( {maxCombo: this.state.combo + 1} )
            this.newPokemon(false);
        
        // Incorrect input, display a hint filling correct indicies of letters
        } else  {
            this.setState( {shake: true} );

            if(this.props.difficulty === "Hard") return;

            let s = "";
            for(let i = 0; i < correct.length; i++) {
                s += ((guess[i] === correct[i] || this.state.lineText[i*2] !== "_") ? correct[i] + " " : "_ ")
            }
            this.setState( {lineText: s.trim(), combo: 0} ) 
        }
    }


    displayTime() {
        if(this.props.initialTime === "Zen Mode") {
            return <i className="fa-solid fa-infinity"></i>
        } else {
            return this.props.currentTime;
        }
    }

    renderZenModeButton() {
        if(this.props.initialTime === "Zen Mode") {
            return (
                <button onClick={this.props.endZenMode}>
                    {"Finish"}
                </button>
            )
        }
    }

    render() {
        return (
                <div ref={this.gameState} className="game">
                    <div className="text-array">
                        <h2>{"Score: " + this.state.score}</h2>
                        <h2 className={(this.props.currentTime <= 10 && this.props.currentTime % 2 === 0 && this.props.initialTime !== "Zen Mode") ? "red" : ""}>
                            {this.displayTime()}
                        </h2>
                    </div>

                    <div className="mon-flex">
                        <Pokemon url={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + (this.state.dexNumber) + ".png"}
                                onClick={() => this.newPokemon(true)}/>

                        <div id="mobile-array" className="button-array">
                            <button onClick={() => this.newPokemon(true)}>
                                {"Pass"}
                            </button>
                            <button onClick={() => this.handleHintClick()}>
                                {"Hint"}
                            </button>
                        </div>
                    </div>
            
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input className={this.state.shake ? "shake " : ""} 
                               onAnimationEnd={() => this.setState({shake: false})} 
                               disabled={this.props.currentTime === 0} 
                               type="text" 
                               value={this.state.guess} 
                               onChange={(event) => this.handleInputChange(event)}/>

                        <i className={this.state.check ? "fas fa-circle-check check" : "fas fa-circle-check"}
                            onAnimationEnd={() => this.setState({check: false})}>
                        </i>
                    </form>
                    <p className="linetext">{this.state.lineText}</p>
                </div>
                <div id="desktop-array" className="button-array">
                    <button onClick={() => this.newPokemon(true)}>
                        {"Pass"}
                    </button>
                    <button onClick={() => this.handleHintClick()}>
                        {"Hint"}
                    </button>
                </div>
                {this.renderZenModeButton()}


                <h3>{this.state.hintMessage}</h3>
                <p className={this.state.combo < 5 ? "combo" : "combo hot-combo"} key={this.state.combo}>{this.state.combo <= 1 ? null : this.state.combo + "x Combo!"}</p>
                </div>

        );
    }
}