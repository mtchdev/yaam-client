import { 
    FETCH_AIRCRAFT_ERROR,
    FETCH_AIRCRAFT_PENDING,
    FETCH_AIRCRAFT_SUCCESS,
    FETCH_ALL_AIRCRAFT_ERROR,
    FETCH_ALL_AIRCRAFT_PENDING,
    FETCH_ALL_AIRCRAFT_SUCCESS,
    FOCUS_AIRCRAFT,
    UNFOCUS_AIRCRAFT
 } from "./actionTypes";


 // Usually called from aircraft marker
export const focusAircraft = () => ({
    type: FOCUS_AIRCRAFT,
})

export const unFocusAircraft = () => ({
    type: UNFOCUS_AIRCRAFT,
})


// Actions involving fetching the expanded data of a single aircraft
export const fetchAircraftPending = (payload) => ({
    type: FETCH_AIRCRAFT_PENDING,
    payload
})

export const fetchAircraftSuccess = (payload) => ({
    type: FETCH_AIRCRAFT_SUCCESS,
    payload
})

export const fetchAircraftError = (error) => ({
    type: FETCH_AIRCRAFT_ERROR,
    error
})


// Actions involving fetching the basic data of ALL aircraft
export const fetchAllAircraftPending = () => ({
    type: FETCH_ALL_AIRCRAFT_PENDING,
})

export const fetchAllAircraftSuccess = (allAircraft) => ({
    type: FETCH_ALL_AIRCRAFT_SUCCESS,
    allAircraft
})

export const fetchAllAircraftError = (error) => ({
    type: FETCH_ALL_AIRCRAFT_ERROR,
    error
})



