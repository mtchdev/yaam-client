import { TOGGLE_FIRS, TOGGLE_COLOR_MODE } from "./actionTypes";

export const toggleFIRs = (payload) => ({
    type: TOGGLE_FIRS,
    payload
})

export const toggleColorMode = () => ({
    type: TOGGLE_COLOR_MODE
})

