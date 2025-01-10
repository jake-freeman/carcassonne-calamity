// import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import blackMerson from '../../assets/meeple/black_merson.png';
import blueMerson from '../../assets/meeple/blue_merson.png';
import greenMerson from '../../assets/meeple/green_merson.png';
import pinkMerson from '../../assets/meeple/pink_merson.png';
import redMerson from '../../assets/meeple/red_merson.png';

import blackMessenger from '../../assets/meeple/black_messenger.png';
import blueMessenger from '../../assets/meeple/blue_messenger.png';
import greenMessenger from '../../assets/meeple/green_messenger.png';
import pinkMessenger from '../../assets/meeple/pink_messenger.png';
import redMessenger from '../../assets/meeple/red_messenger.png';

import blackRobber from '../../assets/meeple/black_robber.png';
import blueRobber from '../../assets/meeple/blue_robber.png';
import greenRobber from '../../assets/meeple/green_robber.png';
import pinkRobber from '../../assets/meeple/pink_robber.png';
import redRobber from '../../assets/meeple/red_robber.png';

const Root = styled.img`
    width: ${(props) => props.width}px;
    height: ${(props) => props.width}px;

    filter: drop-shadow( 1px  1px 0 black)
            drop-shadow( 1px -1px 0 black)
            drop-shadow(-1px -1px 0 black)
            drop-shadow(-1px  1px 0 black);
    
    :hover {
        filter: drop-shadow( 1px  1px 0 white)
                drop-shadow( 1px -1px 0 white)
                drop-shadow(-1px -1px 0 white)
                drop-shadow(-1px  1px 0 white);
    }
`;

const MERSON_TYPE = 'merson';
const MESSENGER_TYPE = 'messenger';
const ROBBER_TYPE = 'robber';
const MEEPLE_TYPES = [ MERSON_TYPE, MESSENGER_TYPE, ROBBER_TYPE ];


// Hard-coded
const PERSON_TO_COLOR_MAP = {
    "catlet": "red",
    "dan": "pink",
    "jake": "green",
    "joe": "blue",
    "jon": "black"
};

const COLOR_AND_TYPE_TO_SRC_MAP = {
    "black": {
        [MERSON_TYPE]: blackMerson,
        [MESSENGER_TYPE]: blackMessenger,
        [ROBBER_TYPE]: blackRobber
    },
    "blue": {
        [MERSON_TYPE]: blueMerson,
        [MESSENGER_TYPE]: blueMessenger,
        [ROBBER_TYPE]: blueRobber
    },
    "green": {
        [MERSON_TYPE]: greenMerson,
        [MESSENGER_TYPE]: greenMessenger,
        [ROBBER_TYPE]: greenRobber
    },
    "pink": {
        [MERSON_TYPE]: pinkMerson,
        [MESSENGER_TYPE]: pinkMessenger,
        [ROBBER_TYPE]: pinkRobber
    },
    "red": {
        [MERSON_TYPE]: redMerson,
        [MESSENGER_TYPE]: redMessenger,
        [ROBBER_TYPE]: redRobber
    }
};

const getSourceFile = (name, type) => {
    return COLOR_AND_TYPE_TO_SRC_MAP[PERSON_TO_COLOR_MAP[name]][type];
};

export default function Meeple({
    name,
    type = MERSON_TYPE,
    width = 25,
}) {
    return (
        <Root title={name} width={width} src={getSourceFile(name, type)} />
    );
}

Meeple.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(MEEPLE_TYPES),
    width: PropTypes.number,
};
