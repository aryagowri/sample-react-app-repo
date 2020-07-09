import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: null,
    loading: false,
    userId: null,
    token: null,
    email: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                userId: action.userId,
                token: action.token,
                email: action.email
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.USER_LOGOUT:
            return {
                ...state,
                userId: null,
                token: null
            }
        default:
            return state;
    }
}
export default reducer;