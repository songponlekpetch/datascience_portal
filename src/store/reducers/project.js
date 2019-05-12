import * as actionType from '../actions/actionTypes'

const initialState = {
    selectedProject: null
}

const selectProject = (state, action) => {
    return { ...state, selectedProject: action.project }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SELECTED_PROJECT: return selectProject(state, action);
        default: return state
    }
}

export default reducer;