import { useEffect, useState, useCallback, useMemo } from "react";

const SAVE_NAME = "carcassonne-calamity-3";

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
        // Save to local storage
        // const saveFile = {
        //     stateHistory,
        //     undoHistory,
        // };

        // localStorage.setItem(SAVE_NAME, JSON.stringify(saveFile));
    }, [stateHistory, undoHistory]);

    const currentState = useMemo(() => {
        if (stateHistory.length === 0) {
            return getDefaultState();
        }
        else {
            return stateHistory[stateHistory.length - 1];
        }
    }, [stateHistory]);

    const addToScore = useCallback((player, amount) => {
        // TODO: Add logic for scoring

        // HACK: For now just add to merson score
        const mersonScore = amount
        const messengerScore = 0;

        const newState = {
            ...currentState,
            scores: {
                ...currentState.scores,
                [player]: [...currentState.scores[player]],
            }
        };

        newState.scores[player] = [mersonScore, messengerScore];

        setStateHistory([...stateHistory, newState]);
    }, [currentState, setStateHistory, stateHistory]);

    const setScoreByForce = useCallback((player, amounts) => {
        const newState = {
            ...currentState,
            scores: {
                ...currentState.scores,
                [player]: [...currentState.scores[player]],
            }
        };

        newState.scores[player] = [...amounts];

        setStateHistory([...stateHistory, newState]);
    }, [currentState, setStateHistory, stateHistory]);

    const setRobberPos = useCallback((player, robberPos) => {
        const newState = {
            ...currentState,
            robbers: {
                ...currentState.robbers,
                [player]: robberPos,
            },
        };

        setStateHistory([...stateHistory, newState]);
    }, [currentState, setStateHistory, stateHistory]);

    const undoLast = useCallback(() => {
        if (stateHistory.length === 0) {
            return ;
        }

        const [stateToUndo, ...newStateHistory] = stateHistory;

        setStateHistory(newStateHistory);
        setUndoHistory([...undoHistory, stateToUndo]);
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
