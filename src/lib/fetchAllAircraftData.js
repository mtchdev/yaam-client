import {fetchAllAircraftSuccess, fetchAllAircraftError, fetchAircraftPending } from "../redux/actions";

const fetchAircraftData = () => {
    return async dispatch => {
        dispatch(fetchAircraftPending());
        try {
            let res = await fetch(process.env.REACT_APP_API_ADDR+'/data')
            res = await res.json();
            dispatch(fetchAllAircraftSuccess(res));
        } catch (error) {
            dispatch(fetchAllAircraftError(error));
        }
    }
}

export default fetchAircraftData;