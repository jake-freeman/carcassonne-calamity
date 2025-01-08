// import { useState } from 'react'
// import greenMessenger from './assets/meeple/green_messenger.png'
// import blueMersen from './assets/meeple/blue_mersen.png'
import './App.css'
import Scoreboard from './components/Scoreboard/Scoreboard'
import useCarcasstate from './data/useCarcasstate';
import Scorecard from './components/Scorecard/Scorecard';

function App() {
    const {
        addToScore,
        setScoreByForce,
        undoLast,
        setRobberPos,

        currentState,
        stateHistory,
        undoHistory,
    } = useCarcasstate();

    return (
        <div>
            <Scoreboard />
            <Scorecard
                addToScore={addToScore}
                setScoreByForce={setScoreByForce}
                undoLast={undoLast}
                setRobberPos={setRobberPos}

                currentState={currentState}
                stateHistory={stateHistory}
                undoHistory={undoHistory}
            />
        </div>
    );
}

export default App
