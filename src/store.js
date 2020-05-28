import {createStore, applyMiddleware} from 'redux';
import allReducers from './reducers/index';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk, logger)));

export default store;
