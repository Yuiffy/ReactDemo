import React from 'react';
import {view as Todos} from './todos/';
import {view as Filter} from './filter/';
import {view as GameBoard} from './gameBoard/';

function App() {
    return (
        <div>
            <div>你在一场赌局之中。你有3颗星星，12张牌。过程中如果失去所有星星，或者剩下牌没出完，或者最后少于三颗星星，就会被抓去地底当矿工还债。现在全场只剩下一个人来和你赌了。</div>
            <GameBoard/>
        </div>
    );
}

export default App;
