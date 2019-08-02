import { fetchAircraftError, fetchAircraftPending, fetchAircraftSuccess, focusAircraft } from "../redux/actions";

const fetchAircraftData = () => {
    return async dispatch => {
        dispatch(fetchAircraftPending());
        try {
            let res = await fetch('http://localhost:5000/data/plane')
            res = await res.json();
            dispatch(fetchAircraftSuccess(res));
            dispatch(focusAircraft())
        } catch (error) {
            dispatch(fetchAircraftError(error));
        }
    }
}

export default fetchAircraftData;