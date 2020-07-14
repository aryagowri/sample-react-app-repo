import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (token, userId, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        email: email
    }
}
export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
export const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        return {
            type: actionTypes.USER_LOGOUT
        }
}
export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },
        expirationTime * 1000);
    }
}
export const checkForAutoLogin = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token) {
            const userId = localStorage.getItem('userId');
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate >= new Date()) {
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()/1000));
            }
            else {
                dispatch(logout());
            }
        }
        else {
            dispatch(logout());
        }
    }
}
export const loginSubmit = (email, password, isLogin) => {
    return dispatch => {
        dispatch(authStart());
        const loginInfo = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSq5m9a1R0swHOoXxs6jgTgQF9oAdsawY';
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSq5m9a1R0swHOoXxs6jgTgQF9oAdsawY';
        }
        axios.post(url, loginInfo)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.email));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
}