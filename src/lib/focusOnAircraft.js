import { fetchAircraftError, fetchAircraftPending, fetchAircraftSuccess, focusAircraft } from "../redux/actions";

const fetchAircraftData = (callsign) => {
    return async dispatch => {
        dispatch(fetchAircraftPending(callsign));
        try {
            let res = await fetch(`${process.env.REACT_APP_API_ADDR}/data/${callsign}`)

            if (!res.ok) {
                throw Error(res.statusText);
            }

            res = await res.json();
            dispatch(fetchAircraftSuccess(res));
            dispatch(focusAircraft())
        } catch (error) {
            dispatch(fetchAircraftError(error));
        }
    }
}

export default fetchAircraftData;