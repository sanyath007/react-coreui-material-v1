import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import itemReducer from './items/reducer';
import itemTypeReducer from './itemTypes/reducer';

const rootReducer = combineReducers({
  item: itemReducer,
  itemType: itemTypeReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
