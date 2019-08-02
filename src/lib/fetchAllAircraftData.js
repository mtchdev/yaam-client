import { fetchAllAircraftPending, fetchAllAircraftSuccess, fetchAllAircraftError } from "../redux/actions";

const fetchAircraftData = () => {
    return async dispatch => {
        dispatch(fetchAllAircraftError());
        try {
            let res = await fetch('http://localhost:5000/data')
            res = await res.json();
            dispatch(fetchAllAircraftSuccess(res));
        } catch (error) {
            dispatch(fetchAllAircraftError(error));
        }
    }
}

export default fetchAircraftData;