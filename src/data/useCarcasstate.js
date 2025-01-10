import { useEffect, useState, useCallback, useMemo } from "react";

const SAVE_NAME = "carcassonne-calamity-3";

import carcassorithm from './carcassorithm'

export const MERSON_INDEX = 0;
export const MESSENGER_INDEX = 1;

function getDefaultState() {
    return {
        scores: {
            jake: [0, 0],
            jon: [0, 0],
            dan: [0, 0],
            joe: [0, 0],
            catlet: [0, 0],
        },
        robbers: {
            jake: null,
            jon: null,
            dan: null,
            joe: null,
            catlet: null,
        },
        timestamp: null,
    };
}

export default function useCarcasstate() {
    const [ stateHistory, setStateHistory ] = useState([]);
    const [ undoHistory, setUndoHistory ] = useState([]);

    useEffect(() => {
        // parse from local storage
        const rawSaveFile = localStorage.getItem(SAVE_NAME);

        if (rawSaveFile) {
            console.log("LOAD FROM SAVE");
            const saveFile = JSON.parse(rawSaveFile);

            setStateHistory(saveFile.stateHistory);
            setUndoHistory(saveFile.undoHistory);
        }
    }, [setStateHistory, setUndoHistory]);

    useEffect(() => {
        if (stateHistory.length === 0 && undoHistory.length === 0) {
            return ;
        }

        // Save to local storage
        const saveFile = {
            stateHistory,
            undoHistory,
        };

        localStorage.setItem(SAVE_NAME, JSON.stringify(saveFile));
    }, [stateHistory, undoHistory]);

    const currentState = useMemo(() => {
        if (stateHistory.length === 0) {
            return getDefaultState();
        }
        else {
            return stateHistory[0];
        }
    }, [stateHistory]);

    const addToScore = useCallback((player, amount) => {
        if (!currentState.scores[player]) {
            return ;
        }

        const newState = {
            ...currentState,
            scores: {
                ...currentState.scores,
                [player]: [...currentState.scores[player]],
            },
            robbers: {
                ...currentState.robbers,
            },
            timestamp: new Date(),
        };

        carcassorithm({
            gameState: newState.scores,
            player,
            score: amount,
            robbers: newState.robbers,
        });

        setStateHistory([newState, ...stateHistory]);
    }, [currentState, setStateHistory, stateHistory]);

    const setScoreByForce = useCallback((player, amounts) => {
        if (!currentState.scores[player]) {
            return ;
        }

        const newState = {
            ...currentState,
            scores: {
                ...currentState.scores,
                [player]: [...currentState.scores[player]],
            },
            timestamp: new Date(),
        };

        newState.scores[player] = [...amounts];

        setStateHistory([newState, ...stateHistory]);
    }, [currentState, setStateHistory, stateHistory]);

    const setRobberPos = useCallback((player, robberPos) => {
        if (!currentState.scores[player]) {
            return ;
        }

        const newState = {
            ...currentState,
            robbers: {
                ...currentState.robbers,
                [player]: robberPos,
            },
            timestamp: new Date(),
        };

        setStateHistory([newState, ...stateHistory]);
    }, [currentState, setStateHistory, stateHistory]);

    const undoLast = useCallback(() => {
        if (stateHistory.length === 0) {
            return ;
        }

        const [stateToUndo, ...newStateHistory] = stateHistory;

        const undoState = {
            ...stateToUndo,
            undoTimestamp: new Date(),
        };

        setStateHistory(newStateHistory);
        setUndoHistory([undoState, ...undoHistory]);
    }, [stateHistory, setStateHistory, undoHistory, setUndoHistory]);

    return {
        addToScore,
        setScoreByForce,
        undoLast,
        setRobberPos,

        currentState,
        stateHistory,
        undoHistory,
    };
}
