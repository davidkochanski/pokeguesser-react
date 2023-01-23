import React from 'react';
import './main.css';

function Pokemon(props) {
    return (
        <img className="mon" src={"" + props.url} alt="mon" onClick={props.onClick}/>
    )
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
            <Pokemon url={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + this.state.dexNumber + ".png"}
                     onClick={() => this.handleClick()}/>
        );
    }





}




export default Game;
