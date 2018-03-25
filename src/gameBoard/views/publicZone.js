import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import CardItem from './cardItem.js';
import {playCard, showHand, roundEnd} from '../actions.js';
import {FilterTypes} from '../../constants.js';

const PublicZone = ({showCards, allReady, showHand, isShow, roundEnd}) => {
    return (
        <ul className="publicZone">
            <div className="cards">
                {
                    showCards.map((item) => (
                        <CardItem
                            key={item.id}
                            type={item.type}
                            isShow={isShow}
                        />
                    ))
                }
            </div>
            <div>
                {allReady && !isShow ? <button className="button" onClick={showHand}>翻牌</button> : null}
                {allReady && isShow ? <button  className="button" onClick={roundEnd}>结算</button> : null}
            </div>
        </ul>
    );
};

PublicZone.propTypes = {
    todos: PropTypes.array.isRequired
};

const selectVisibleTodos = (todos, filter) => {
    switch (filter) {
        case FilterTypes.ALL:
            return todos;
        case FilterTypes.COMPLETED:
            return todos.filter(item => item.completed);
        case FilterTypes.UNCOMPLETED:
            return todos.filter(item => !item.completed);
        default:
            throw new Error('unsupported filter');
    }
}

const showPlayedCards = (players) => {

};


const mapStateToProps = (state) => {
    const players = state.game.players;
    let cards = [];
    let allReady = true;
    for (const key in players) {
        const player = players[key];
        if (player.cardPlayed.length > 0) {
            cards = cards.concat(player.cardPlayed);
        } else {
            allReady = false;
        }
    }
    return {
        showCards: cards,
        allReady: allReady,
        isShow: state.game.isShow
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showHand: () => {
            dispatch(showHand());
        },
        roundEnd: () => {
            dispatch(roundEnd());
        }
    };
};

/*
 const mapDispatchToProps = (dispatch) => bindActionCreators({
 onToggleTodo: toggleTodo,
 onRemoveTodo: removeTodo
 }, dispatch);
 */

export default connect(mapStateToProps, mapDispatchToProps)(PublicZone);

