import * as actionType from './actionTypes'

export const selectProject = (selectedProject) => {
    return dispatch => {
        dispatch({
            type: actionType.SELECTED_PROJECT,
            project: selectedProject
        })
    }
}
