import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, { error: null, loading: true })
        default:
            return state
    }
}

export default reducer