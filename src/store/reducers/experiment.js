import * as actionType from '../actions/actionTypes'

const initialState = {
    experiments: null
}

const fetchExperiments = (state, action) => {
    return { ...state, experiments: action.experiments }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.FETCH_EXPERIMENTS: return fetchExperiments(state, action);
        default: return state
    }
}

export default reducer;