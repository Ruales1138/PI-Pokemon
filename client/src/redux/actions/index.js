import axios from 'axios';

export const GET_DATA = 'GET_DATA';

export const getData = () => async (dispatch) => {
    let json = await axios.get('http://localhost:3001/pokemon');
    return dispatch({ type: GET_DATA, payload: json.data });
};