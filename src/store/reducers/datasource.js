import * as actionTypes from '../actions/actionTypes'

const initialState = {
    datasources: null,
    datasource: {
        header: null,
        metadata: null,
    },
    datasourceForm: {
        name: null,
        description: null,
        selectedFile: null,
        fileType: null
    }
};

const fetchDatasources = (state, action) => {
    return { ...state, datasources: action.datasources }
}

const fetchDatasource = (state, action) => {
    return { ...state, datasource: action.datasource }
}

const newDatasource = (state, action) => {
    return { ...state, datasourceForm: action.datasourceForm }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DATASOURCES: return fetchDatasources(state, action);
        case actionTypes.FETCH_DATASOURCE: return fetchDatasource(state, action);
        case actionTypes.NEW_DATASOURCE: return newDatasource(state, action);
        default: return state
    }
}

export default reducer;