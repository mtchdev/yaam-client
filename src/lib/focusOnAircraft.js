import { fetchAircraftError, fetchAircraftPending, fetchAircraftSuccess, focusAircraft } from "../redux/actions";

const fetchAircraftData = (callsign) => {
    return async dispatch => {
        dispatch(fetchAircraftPending(callsign));
        try {
            let res = await fetch(`http://localhost:5000/api/data/${callsign}`)
            res = await res.json();
            dispatch(fetchAircraftSuccess(res));
            dispatch(focusAircraft())
        } catch (error) {
            dispatch(fetchAircraftError(error));
        }
    }
}

export default fetchAircraftData;