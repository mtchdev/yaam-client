import { fetchAircraftError, fetchAircraftPending, fetchAircraftSuccess, focusAircraft, unFocusAircraft } from "../redux/actions";

const fetchAircraftData = (callsign, shouldGoTo) => {
    return async dispatch => {
        dispatch(fetchAircraftPending(callsign));
        try {
            let res = await fetch(`${process.env.REACT_APP_API_ADDR}/data/${callsign}`)

            if (!res.ok) {
                throw Error(res.statusText);
            }

            res = await res.json();
            dispatch(fetchAircraftSuccess(res));
            dispatch(focusAircraft(shouldGoTo))
        } catch (error) {
            dispatch(fetchAircraftError(error));
            dispatch(unFocusAircraft())
        }
    }
}

export default fetchAircraftData;