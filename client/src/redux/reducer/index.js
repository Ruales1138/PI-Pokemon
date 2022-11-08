import { GET_DATA, GET_DATA_BY_NAME } from "../actions";

const initialState = {
    data: [],
    dataCopy: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DATA:
            return {
                ...state,
                data: action.payload,
                dataCopy: action.payload
            };

        case GET_DATA_BY_NAME:
            return {
                ...state,
                data: action.payload
            }

        default: 
                return { ...state }
    }
};

export default rootReducer;