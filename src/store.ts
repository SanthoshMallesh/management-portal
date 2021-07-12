import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import callAPI from './middleware/callAPIMiddlware';
import rootReducer from './reducers/index';
export default createStore(rootReducer, composeWithDevTools(applyMiddleware(...[thunk, callAPI])));
