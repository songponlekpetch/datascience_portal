import datascienceAPI from '../../apis/datascienceAPI'
import * as actionType from './actionTypes'

export const getExperiments = (projectId) => {
    return async dispatch => {
        await datascienceAPI.get(`/datascience/project/${projectId}/experiments`)
            .then(response => {
                dispatch({
                    type: actionType.FETCH_EXPERIMENTS,
                    experiments: response.data.data
                })
            })
            .catch(error => {
                dispatch({
                    type: actionType.FETCH_EXPERIMENTS,
                    experiments: error.response.data
                })
            })
    }
}
