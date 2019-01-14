import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as order from './order/reducer';
import * as myOrder from './myOrder/reducer';
import thunk from 'redux-thunk';

let store = createStore(
  combineReducers({...order,...myOrder}),
  applyMiddleware(thunk)
);

export default store;