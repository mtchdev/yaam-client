import { TOGGLE_FIRS, TOGGLE_COLOR_MODE } from "../actionTypes";
import { DARK_MODE, LIGHT_MODE } from "../../assets/styles";

const initialState = {
    toggleFIRs: true,
    isDarkMode: false,
    themeColors: LIGHT_MODE
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case TOGGLE_FIRS:
        return { 
            ...state,
            toggleFIRs: payload
        }

    case TOGGLE_COLOR_MODE:
        if (state.isDarkMode) {
            return {...state, isDarkMode: false, themeColors: LIGHT_MODE}
        } else {
            return {...state, isDarkMode: true, themeColors: DARK_MODE}
        }

    default:
        return state
    }
}
