import { GET_DATA } from "../actions";

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

        default: 
                return { ...state }
    }
};

export default rootReducer;