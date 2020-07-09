import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

export const formSubmitStart = () => {
    return {
        type: actionTypes.FORM_SUBMIT_START
    }
}
export const formSubmitSuccess = (id, orderData) => {
    return {
        type: actionTypes.FORM_SUBMIT_SUCCESS
    }
}
export const formSubmitFailed = (error) => {
    return {
        type: actionTypes.FORM_SUBMIT_FAILED,
        error: error
    }
}
export const formSubmit = (token, data) => {
    return dispatch => {
        dispatch(formSubmitStart());
        axios.post('/forms.json?auth=' + token, data)
        .then(response=> {
            dispatch(formSubmitSuccess());
        })
        .catch(error => {
            dispatch(formSubmitFailed(error));
        })

    }
}
export const inputValueChanged = (name, value, errorMsg, step) => {
    return {
        type: actionTypes.INPUT_VALUE_CHANGED,
        name: name,
        value: value,
        errorMsg: errorMsg,
        step: step
    }
}
export const isFormValid = (step, isValid) => {
    return {
        type: actionTypes.FORM_VALID_CHECK,
        step: step, 
        value: isValid
    }
}
export const resetClicked = step => {
    return {
        type: actionTypes.RESET_CLICKED,
        step: step
    }
}
export const addClicked = (step, data) => {
    return {
        type: actionTypes.ADD_CLICKED,
        step: step,
        data: data
    }
}
export const tableDeleteClicked = (step, index) => {
    return {
        type: actionTypes.TABLE_DELETE_ROW,
        step: step,
        index: index
    }
}