import { combineReducers } from 'redux'

const intialState = []

const regions = (state = intialState, action) => {
    console.log('action', action);
    switch (action.type) {
        case 'ADD':
            return [
                ...state,
                action.payload
            ];
        default: return state;
    }
}

const rootReducer = combineReducers({ regions })
export default rootReducer
