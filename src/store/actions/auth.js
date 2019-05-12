import * as actionTypes from './actionTypes'
import datascienceAPI from '../../apis/datascienceAPI'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart())
        datascienceAPI.post(`/login`, { email, password })
            .then(response => {
                const data = response.data
                dispatch(authSuccess(data))
                const accessToken = data.access_token
                const refreshToken = data.refresh_token
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)
                this.setState({ hasSpin: false })
                this.props.history.push(`/datascience/lab`)
            })
            .catch(error => {
                console.log(error)
                dispatch(authFail(error))
            })
    }
}