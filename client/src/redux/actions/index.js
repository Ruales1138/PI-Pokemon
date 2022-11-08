import axios from 'axios';

export const GET_DATA = 'GET_DATA';
export const GET_DATA_BY_NAME = 'GET_DATA_BY_NAME';

export const getData = () => async (dispatch) => {
    let json = await axios.get('http://localhost:3001/pokemon');
    return dispatch({ type: GET_DATA, payload: json.data });
};

export const getDataByName = (name) => async (dispatch) => {
    let json = await axios.get(`http://localhost:3001/pokemon/?name=${name}`);
    return dispatch({ type: GET_DATA_BY_NAME, payload: json.data });
};