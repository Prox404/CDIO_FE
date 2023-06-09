// store.js
import { legacy_createStore as createStore, combineReducers } from 'redux';
import { userReducer, cartReducer } from '~/reducers/reducers';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

const savedState = localStorage.getItem("reduxState");

const store = createStore(
    rootReducer,
    savedState ? JSON.parse(savedState) : undefined,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  

export default store;
