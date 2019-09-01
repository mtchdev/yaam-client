import { 
    FETCH_AIRCRAFT_ERROR,
    FETCH_AIRCRAFT_PENDING,
    FETCH_AIRCRAFT_SUCCESS,
    FETCH_ALL_AIRCRAFT_ERROR,
    FETCH_ALL_AIRCRAFT_PENDING,
    FETCH_ALL_AIRCRAFT_SUCCESS,
    FOCUS_AIRCRAFT,
    UNFOCUS_AIRCRAFT
 } from "../actionTypes";

 import settingsReducer from "./settingsReducer";

function combineReducersWithRoot(rootReducer, reducers) {
    return (state, action) => {
      // Ensure the root state object is a new object; otherwise
      // React may not re-render.
      let newState = {...rootReducer(state, action)};
      Object.keys(reducers).forEach(domain => {
        let obj = state ? state[domain] : undefined;
        newState[domain] = reducers[domain](obj, action);
      });
      return newState;
    };
  }

const initalState = {
    settings: {},
    pending: false, 
    focused: false,
    error: null,
    allAircraft: {pilots: [], atc: []}
}

function rootReducer(state = initalState, action) {
    switch(action.type) {
        // TODO: Look into getting rid of this, since we can use the focused aircraft data instead of dispatching twice...
        case FOCUS_AIRCRAFT:
            return {
                ...state,
                focused: true
            }
        case UNFOCUS_AIRCRAFT:
            return {
                ...state,
                focused: false,
                focusedData: null,
            }
        case FETCH_AIRCRAFT_PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCH_AIRCRAFT_SUCCESS:
            return {
                ...state, 
                pending: false,
                focusedData: action.payload

            }
        case FETCH_AIRCRAFT_ERROR:
            return {
                ...state, 
                pending: false,
                error: action.error,
                focusedData: null
            }
        case FETCH_ALL_AIRCRAFT_PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCH_ALL_AIRCRAFT_SUCCESS:
            return {
                ...state, 
                pending: false,
                allAircraft: action.allAircraft
            }
        case FETCH_ALL_AIRCRAFT_ERROR:
            return {
                ...state, 
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default combineReducersWithRoot(rootReducer, {settings: settingsReducer})

export const getAircraft = state => state.aircraftFocused;
export const getAircraftPending = state => state.pending;
export const getAircraftError = state => state.error;

export const getAllAircraft = state => state.allAircraft;
export const getAllAircraftPending = state => state.pending;
export const getAllAircraftError = state => state.error;