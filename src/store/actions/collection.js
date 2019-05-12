import datascienceAPI from '../../apis/datascienceAPI'
import * as actionType from './actionTypes'

export const getCollections = () => {
    return async dispatch => {
        await datascienceAPI.get('/datascience/collections')
            .then(response => {
                dispatch({
                    type: actionType.FETCH_COLLECTIONS,
                    collections: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: actionType.FETCH_COLLECTIONS,
                    collections: null
                })
            })
    }
}