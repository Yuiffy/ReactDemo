import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import {reducer as todoReducer} from './todos';
import {reducer as filterReducer} from './filter';
import {reducer as gameReducer} from './gameBoard';


const win = window;

const reducer = combineReducers({
    todos: todoReducer,
    filter: filterReducer,
    game: gameReducer
});

let cardCount = 0;
const createInitCards = () => {
    const defaultCards = [];
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 4; j++)
            defaultCards.push({
                id: cardCount++,
                type: i
            });
    return defaultCards;
};

const initValues = {
    game: {
        players: {
            你: {
                life: 3,
                cards: createInitCards(),
                cardPlayed: [],
                isComputer: false
            },
            对手: {
                life: 3,
                cards: createInitCards(),
                cardPlayed: [],
                isComputer: true
            }
        },
        order: ['你', '对手'],
        nowPlayer: "你",
        isShow: false
    }
};

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

export default createStore(reducer, initValues, storeEnhancers);
