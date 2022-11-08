import axios from 'axios';

export const GET_ALL_INFO = 'GET_ALL_INFO';

export const getAllInfo = () => async (dispatch) => {
    let json = await axios.get('http://localhost:3001/pokemon');
    return dispatch({ type: GET_ALL_INFO, payload: json.data });
};