import React from 'react';
import {view as Todos} from './todos/';
import {view as Filter} from './filter/';
import {view as GameBoard} from './gameBoard/';

function App() {
    return (
        <div>
            <GameBoard/>
        </div>
    );
}

export default App;
