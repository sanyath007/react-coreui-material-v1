import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import itemReducer from './items/reducer';
import orderReducer from './orders/reducer';
import itemTypeReducer from './itemTypes/reducer';
import itemGroupReducer from './itemGroups/reducer';
import unitReducer from './units/reducer';
import personReducer from './persons/reducer';
import deptReducer from './depts/reducer';

const rootReducer = combineReducers({
  item: itemReducer,
  order: orderReducer,
  itemType: itemTypeReducer,
  itemGroup: itemGroupReducer,
  unit: unitReducer,
  person: personReducer,
  dept: deptReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
