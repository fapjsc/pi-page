import { combineReducers, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import { connectStatusReducers, egmDataReducers } from './reducers/egmReducer';

const reducer = combineReducers({
  connectionStatus: connectStatusReducers,
  egmData: egmDataReducers,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
