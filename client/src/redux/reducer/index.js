import { GET_ALL_INFO } from "../actions";

const initialState = {
    info: [],
    infoCopy: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_INFO:
            return {
                ...state,
                info: action.payload,
                infoCopy: action.payload
            };

        default: 
                return { ...state }
    }
};

export default rootReducer;