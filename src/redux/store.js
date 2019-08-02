import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers/aircraftDataReducer";
import thunk from "redux-thunk";

const middleware = [thunk]
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(...middleware))
    );
