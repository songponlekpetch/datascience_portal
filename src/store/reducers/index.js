import { combineReducers } from 'redux'

import datasourceReducers from './datasource'
import collectionReducers from './collection'
import projectReducer from './project'
import experimentReducer from './experiment'

export default combineReducers({
    datasource: datasourceReducers,
    collection: collectionReducers,
    project: projectReducer,
    experiment: experimentReducer
}); 