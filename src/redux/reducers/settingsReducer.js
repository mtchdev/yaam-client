import { TOGGLE_FIRS } from "../actionTypes";

const initialState = {
    toggleFIRs: true
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case TOGGLE_FIRS:
        return { 
            ...state,
            toggleFIRs: payload
        }

    default:
        return state
    }
}
