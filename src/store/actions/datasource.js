import datascienceAPI from '../../apis/datascienceAPI';
import * as actionType from './actionTypes';

export const getDatasources = () => {
    return async dispatch => {
        await datascienceAPI.get('/datascience/datasources')
            .then(response => {
                dispatch({
                    type: actionType.FETCH_DATASOURCES,
                    datasources: response.data.data
                })
            })
            .catch(error => {
                dispatch({
                    type: actionType.FETCH_DATASOURCES,
                    datasources: error.response
                })
            })

    }
}

export const getDatasource = (datasourceId) => {
    return dispatch => {
        datascienceAPI.get(`/datascience/datasource/${datasourceId}`)
            .then(response => {
                dispatch({
                    type: actionType.FETCH_DATASOURCE,
                    datasource: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: actionType.FETCH_DATASOURCE,
                    datasource: error.response
                })
            })
    }
}

export const newDatasource = (datasourceForm) => {
    return dispatch => {
        dispatch({
            type: actionType.NEW_DATASOURCE,
            datasourceForm
        })
    }
}