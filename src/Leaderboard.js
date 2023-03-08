import React from 'react';

export default function Leaderboard(props) {
    const renderLeaderboardCell = (i) => {
        return (
            <div className="leaderboard-row">
                <div>{i}</div>
                <div>{"NAME"}</div>
                <div>{41284}</div>
            </div>
        )
    }

        return (

                <div className="leaderboard">
                    <div className="leaderboard-wrapper glass">

                        {renderLeaderboardCell(1)}
                        {renderLeaderboardCell(2)}
                        {renderLeaderboardCell(3)}
                        {renderLeaderboardCell(4)}
                        {renderLeaderboardCell(5)}
                        {renderLeaderboardCell(6)}
                        {renderLeaderboardCell(7)}
                        {renderLeaderboardCell(8)}
                        {renderLeaderboardCell(9)}
                        {renderLeaderboardCell(10)} 
                    </div>
                    
                    <div className="leaderboard-bottom">
                        <p>Your best: 904</p>
                        <button onClick={(event) => props.returnToMenu(event)}>
                            Return
                        </button>
                    </div>
                    
                    
                </div>

        );
    
}