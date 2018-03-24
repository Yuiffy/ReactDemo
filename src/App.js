import React, {Component} from 'react';
import {createStore} from 'redux';
import logo from './logo.svg';
import './App.css';

/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */

const initValues = {
    'First': 0,
    'Second': 10,
    'Third': 20
};

function counter(state, action) {
    const {caption} = action;
    console.log(action);
    switch (action.type) {
        case 'INCREMENT':
            return {...state, [caption]: state[caption] + 1};
        case 'DECREMENT':
            return {...state, [caption]: state[caption] - 1};
        default:
            return state;
    }
}

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(counter, initValues);

// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(() =>
    console.log(store.getState())
);

class App extends Component {
    constructor(props) {
        super(props);
        this.getOwnState = this.getOwnState.bind(this);
        this.onChange = this.onChange.bind(this);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.state = this.getOwnState();
    }

    getOwnState() {
        return {
            value: store.getState()[this.props.caption]
        };
    }

    onChange() {
        this.setState(this.getOwnState());
        console.log("setState是异步的，还没执行:", this.state, this.getOwnState(), this.state.value);
    }

    componentDidMount() {
        store.subscribe(this.onChange);
    }

    componentWillUnmount() {
        store.unsubscribe(this.onChange);
    }

    increment() {
        store.dispatch({type: 'INCREMENT', caption: this.props.caption});
    }

    decrement() {
        store.dispatch({type: 'DECREMENT', caption: this.props.caption});
    }

    render() {
        const value = this.state.value;
        const {caption} = this.props;
        return (
            <div className="App">
                {/*<header className="App-header">*/}
                {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                {/*<h1 className="App-title">哇，居然来了</h1>*/}
                {/*</header>*/}
                {/*<p className="App-intro">*/}
                {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
                {/*</p>*/}
                <button onClick={this.increment}>
                    INCREMENT
                </button>
                <button onClick={this.decrement}>
                    DECREMENT
                </button>
                <p>{caption} count: {value}</p>
            </div>
        );
    }
}

export default App;
