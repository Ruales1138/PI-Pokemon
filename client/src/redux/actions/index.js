import axios from 'axios';

export const GET_DATA = 'GET_DATA';
export const GET_DATA_BY_NAME = 'GET_DATA_BY_NAME';
export const ALPHABETICAL_ORDER = 'ALPHABETICAL_ORDER';
export const CLEAN = 'CLEAN';

export const getData = () => async (dispatch) => {
    let json = await axios.get('http://localhost:3001/pokemon');
    return dispatch({ type: GET_DATA, payload: json.data });
};

export const getDataByName = (name) => async (dispatch) => {
    let json = await axios.get(`http://localhost:3001/pokemon/?name=${name}`);
    return dispatch({ type: GET_DATA_BY_NAME, payload: json.data });
};

export const alphabeticalOrder = (payload) => {
    return { type: ALPHABETICAL_ORDER, payload: payload };
};

export const clean = () => {
    return { type: CLEAN };
  };