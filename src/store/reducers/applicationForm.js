import * as actionTypes from '../actions/actionTypes';

const initialState = {
    formDetails: {
        personal: {
            firstName: {
                controlType: 'input',
                label: 'First Name',
                value: '',
                errorMsg: '',
                touched: false,
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 12,
                    isNumeric: false,
                    lettersOnly: true
                },
                attribute: {
                    type: 'text'
                }
            },
            lastName: {
                controlType: 'input',
                label: 'Last Name',
                value: '',
                errorMsg: '',
                touched: false,
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 12,
                    isNumeric: false,
                    lettersOnly: true
                },
                attribute: {
                    type: 'text'
                }
            },
            age: {
                controlType: 'input',
                label: 'Age',
                value: '',
                errorMsg: '',
                touched: false,
                validation: {
                    required: true,
                    minValue: 20,
                    maxValue: 40,
                    isNumeric: true,
                    lettersOnly: false
                },
                attribute: {
                    type: 'number'
                }
            },
            city: {
                controlType: 'input',
                label: 'City',
                value: '',
                errorMsg: '',
                touched: false,
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 12,
                    isNumeric: false,
                    lettersOnly: true
                },
                attribute: {
                    type: 'text'
                }
            },
            country: {
                controlType: 'input',
                label: 'Country',
                value: '',
                errorMsg: '',
                touched: false,
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 12,
                    isNumeric: false,
                    lettersOnly: true
                },
                attribute: {
                    type: 'text'
                }
            }
        },
        education: {
            degree: {
                controlType: 'input',
                label: 'Degree',
                value: '',
                errorMsg: '',
                touched: false,
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 12,
                    isNumeric: false,
                    lettersOnly: true
                },
                attribute: {
                    type: 'text'
                }
            },
            yearOfCompletion: {
                controlType: 'select',
                label: 'Year of Completion',
                value: '',
                errorMsg: '',
                touched: false,
                validation: {
                    isNumeric: true
                },
                attribute: {
                    options: Array.of({value: 'Select an Year'}, ...Array.from(new Array(10), (value, index) => { return {value: index + 2010}}))
                }
            },
            institution: {
                controlType: 'input',
                label: 'Institution',
                value: '',
                errorMsg: '',
                touched: false,
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 12,
                    lettersOnly: true
                },
                attribute: {
                    type: 'text'
                }
            }
        },
        work: {
            employer: {
                controlType: 'input',
                label: 'Employer',
                value: '',
                errorMsg: '',
                touched: false,
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 12,
                    lettersOnly: true
                },
                attribute: {
                    type: 'text'
                }
            },
            position: {
                controlType: 'input',
                label: 'Position',
                value: '',
                errorMsg: '',
                touched: false,
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 12,
                    lettersOnly: true
                },
                attribute: {
                    type: 'text'
                }
            },
            experience: {
                controlType: 'input',
                label: 'Experience in months',
                value: '',
                errorMsg: '',
                touched: false,
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 3,
                    isNumeric: true
                },
                attribute: {
                    type: 'number'
                }
            }
        }
    },
    educationData: [],
    workData: [],
    loading: false,
    submitted: false,
    error: null,
    isFormValid: {  personal: false,
                    education: false,
                    work: false
                }
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.INPUT_VALUE_CHANGED:
            return {
                ...state,
                formDetails: {
                    ...state.formDetails,
                    [action.step]: {
                        ...state.formDetails[action.step],
                        [action.name]: {
                            ...state.formDetails[action.step][action.name],
                            touched: true,
                            errorMsg: action.errorMsg,
                            value: action.value
                        }
                    }
                }
            }
        case actionTypes.FORM_VALID_CHECK:
            return {
                ...state,
                isFormValid: {
                    ...state.isFormValid,
                    [action.step]: action.value
                }
            }
        case actionTypes.RESET_CLICKED:
            let data = {};
            const formData = Object.assign({}, state.formDetails[action.step]);
            for(let key in formData) {
                data = {
                    ...data,
                    [key]: {
                        ...formData[key],
                        value: '',
                        errorMsg: '',
                        touched: false
                    }
                }
            }
            return {
                ...state,
                formDetails: {
                    ...state.formDetails,
                    [action.step]: {
                        ...state.formDetails[action.step],
                        ...data
                    }
                }
            }
        case actionTypes.ADD_CLICKED:
            let key = 'educationData';
            if(action.step === 'work') {
                key = 'workData';
            }
            return {
                ...state,
                [key]: [
                    ...state[key],
                    action.data
                ]
            }
        case actionTypes.TABLE_DELETE_ROW:
            let keyValue = 'educationData';
            if(action.step === 'work') {
                keyValue = 'workData';
            }
            const newItems = state[keyValue].map(obj => {return {...obj}});
            newItems.splice(action.index, 1);
            return {
                ...state,
                [keyValue]: newItems
            }
        case actionTypes.FORM_SUBMIT_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FORM_SUBMIT_SUCCESS:
            return {
                ...state,
                loading: false,
                submitted: true
            }
        case actionTypes.FORM_SUBMIT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.CLEAR_ALL_INPUT:
            let newFormDetails = {};
            for(let formDetailsKey in state.formDetails) {
                let keyData = {};
                for(let key in state.formDetails[formDetailsKey]) {
                    keyData = {
                        ...keyData,
                        [key]: {
                            ...state.formDetails[formDetailsKey][key],
                            value: '',
                            errorMsg: '',
                            touched: false
                        }
                    }
                }
                newFormDetails = {
                    ...newFormDetails,
                    [formDetailsKey]: keyData
                }
            }
            return {
                ...state,
                formDetails: newFormDetails,
                educationData: [],
                workData: [],
                submitted: false,
                isFormValid: {  
                                ...state.isFormValid,
                                personal: false,
                                education: false,
                                work: false
                            }

            }
        default:
            return state;
    }
}
export default reducer;