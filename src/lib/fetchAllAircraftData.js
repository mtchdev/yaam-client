import {fetchAllAircraftSuccess, fetchAllAircraftError, fetchAircraftPending } from "../redux/actions";

const fetchAircraftData = () => {
    return async dispatch => {
        dispatch(fetchAircraftPending());
        try {
            let res = await fetch('http://localhost:5000/api/data')
            res = await res.json();
            dispatch(fetchAllAircraftSuccess(res));
        } catch (error) {
            dispatch(fetchAllAircraftError(error));
        }
    }
}

export default fetchAircraftData;