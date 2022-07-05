import reducer from './reducer.js';
import {createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';

const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE || compose;
const store=createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunk))
)

export default store;