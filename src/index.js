import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import { Provider } from 'react-redux'
import reservationReducer from './store/reducers/reservationReducer'
import {createEpicMiddleware} from 'redux-observable'
import rootEpic from './store/reducers/reservationEpic'

const epicMiddleware = createEpicMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reservationReducer, composeEnhancers(applyMiddleware(epicMiddleware)))

epicMiddleware.run(rootEpic)

ReactDOM.render( <Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
