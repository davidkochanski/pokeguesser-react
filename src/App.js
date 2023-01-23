import React from 'react';
import './main.css';

function Pokemon(props) {
    return (
        <img className="mon" src={"" + props.url} alt="mon" onClick={props.onClick}/>
    )
}

class Guesser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guess: ""
        }
    }

    handleChange(event) {
        this.setState({ guess: event.target.value });
    };


    render() {
        return (
            <div>
                <form>
                    <input type="text" value={this.state.guess} onChange={(event) => this.handleChange(event)}/>
                </form>
            <p>{this.state.guess}</p>
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
        return Math.floor(Math.random() * 898) + 1
    }

    handleClick() {
        console.log(this.state);
    }


    render() {
        return(
            <div>
                <Pokemon url={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + this.state.dexNumber + ".png"}
                        onClick={() => this.handleClick()}/>
                <Guesser/>
                <HintButton theHint={"This Pokemon's dex number is " + this.state.dexNumber}/>
            </div>
        );
    }

}




export default Game;
