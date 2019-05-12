import * as actionType from '../actions/actionTypes'

const initialState = {
    collections: null
}

const fetchCollections = (state, action) => {
    return { ...state, collections: action.collections }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.FETCH_COLLECTIONS: return fetchCollections(state, action);
        default: return state
    }
}

export default reducer;