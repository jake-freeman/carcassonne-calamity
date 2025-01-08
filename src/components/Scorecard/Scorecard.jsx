/* eslint-disable react/prop-types */

import { useCallback } from "react";
import Meeple from "../Meeple/Meeple";

function ScoreButton({
    player,
    onScoreSubmit,
}) {
    const triggerScore = useCallback(() => {
        const scoreStr = window.prompt(`Add score for ${player}: `);

        const score = Number.parseInt(scoreStr);

        if (!Number.isNaN(score)) {
            onScoreSubmit(player, score);
        }
    }, [onScoreSubmit, player]);

    return (
        <span onClick={triggerScore}>
            <Meeple name={player} width={50} />
        </span>
    );
}

export default function Scorecard({
    addToScore,
    setScoreByForce,
    undoLast,
    setRobberPos,
    currentState,
    stateHistory,
    undoHistory
}) {
    const onScoreSubmit = useCallback((player, score) => {
        addToScore(player, score);
    }, [addToScore]);

    return (
        <div>
            <ScoreButton player={"jake"} onScoreSubmit={onScoreSubmit} />
            <ScoreButton player={"joe"} onScoreSubmit={onScoreSubmit} />
            <ScoreButton player={"jon"} onScoreSubmit={onScoreSubmit} />
            <ScoreButton player={"dan"} onScoreSubmit={onScoreSubmit} />
            <ScoreButton player={"catlet"} onScoreSubmit={onScoreSubmit} />
            <button onClick={() => undoLast()}>Undo</button>
            <div>
                Current State: {JSON.stringify(currentState)}
            </div>
            <div>
                State History: {JSON.stringify(stateHistory)}
            </div>
            <div>
                Undo History: {JSON.stringify(undoHistory)}
            </div>
        </div>
    );
}
