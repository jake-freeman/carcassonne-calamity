const MERSON_INDEX = 0;
const MESSENGER_INDEX = 1;

// returns 0 if the merson moves, and 1 if the messenger moves 
const getMover = (gameState, player, score) => {
    let mover = MERSON_INDEX;
    if ((gameState[player][MESSENGER_INDEX] + score) % 5 === 0) {
        const sameModuloAfterScore = Object.keys(gameState).some((player) =>
            (gameState[player][MERSON_INDEX] % 50 == (gameState[player][MESSENGER_INDEX] + score) % 50)
            || (gameState[player][MESSENGER_INDEX] % 50 == (gameState[player][MERSON_INDEX] + score) % 50)
        );

        mover = sameModuloAfterScore
            ? MERSON_INDEX
            : MESSENGER_INDEX;
    }

    mover = (gameState[player][MESSENGER_INDEX] + score) % 5 === 1
        ? MESSENGER_INDEX
        : mover;

    return mover;
};

const moveRobbersAfterRobbing = (gameState, robbers, player, mover, newPos) => {
    Object.keys(robbers)
        .filter((robber) => robbers[robber] === gameState[player][mover] && robber != player)
        .forEach((robber) => robbers[robber] = newPos);
}

// player is current scoring player
// gameState is a dict with player names associated with a 2-member array containing the placement of their merson and messenger
// score is the amount of points the current player is getting

export default function scorekeeper({
    gameState,
    player,
    score,
    robbers,
    isRobber = false,
}) {
    const mersonScore = gameState[player][MERSON_INDEX];

    const mersonLap = ((mersonScore % 50) + score) >= 50
        ? 1
        : 0;

    const mersonLanding = (mersonScore + score) % 50;
    const mersonLapCount = Math.floor(mersonScore / 50);

    const messengerScore = gameState[player][MESSENGER_INDEX];

    const messengerLap = ((messengerScore % 50 ) + score) >= 50
        ? 1
        : 0;
    
    const messengerLanding = (messengerScore + score) % 50;
    const messengerLapCount = Math.floor(messengerScore / 50);

    const mover = getMover(gameState, player, score);

    if (!isRobber) {
        Object.keys(robbers).forEach((robber) => {
            if (robbers[robber] === (gameState[player][mover] % 50) && (player !== robber) && (score >= 0)) {
                scorekeeper({
                    gameState,
                    player: robber,
                    score: Math.ceil(score / 2),
                    robbers,
                    isRobber: true,
                });
                robbers[robber] = null;
            }
        });
    }

    const newPos = mover === MERSON_INDEX 
        ? mersonLanding + (50 * mersonLapCount) + (50 * mersonLap)
        : messengerLanding + (50 * messengerLapCount) + (50 * messengerLap);
    
    if (isRobber || score < 0) {
        moveRobbersAfterRobbing(gameState, robbers, player, mover, newPos);
    }
    
    gameState[player][mover] = newPos;
}
