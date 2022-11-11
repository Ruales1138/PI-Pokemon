import { GET_DATA, GET_DATA_BY_NAME, ALPHABETICAL_ORDER, CLEAN } from "../actions";

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
            };

        case ALPHABETICAL_ORDER:
            const alphaOrder = 
                action.payload === 'A-Z'
                ? state.data.sort((a, b) => {
                    if(a.name > b.name) {
                        return 1;
                    }
                    if(a.name < b.name) {
                        return -1;
                    }
                    return 0
                })
                : state.data.sort((a, b) => {
                    if(a.name > b.name) {
                        return -1;
                    }
                    if(a.name < b.name) {
                        return 1;
                    }
                    return 0
                })
            return {
                ...state,
                data: alphaOrder,
            };

        case CLEAN:
            return {
                ...state,
                data: []
            };

        default: 
                return { ...state }
    }
};

export default rootReducer;