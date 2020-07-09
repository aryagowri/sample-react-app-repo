export const checkValidity = (value, rules) => {
    let errMessage = '';
    if(!rules) {
        return ;
    }
    if(rules.required) {
        if(value.trim() === '') {
            errMessage = 'Please enter a value';
            return errMessage;
        }  
    }
    if(rules.minLength) {
        if(value.length < rules.minLength) {
            errMessage = 'Minimum length should be ' + rules.minLength;
            return errMessage;
        }
    }
    if(rules.maxLength) {
        if(value.length > rules.maxLength) {
            errMessage = 'Value shouldn\'t exceeds a maximum length of ' + rules.maxLength;
            return errMessage;
        }
    }
    if(rules.maxValue) {
        if(value > rules.maxValue) {
            errMessage = 'Value should be less than ' + rules.maxValue;
            return errMessage;
        }
    }
    if(rules.minValue) {
        if(value < rules.minValue) {
            errMessage = 'Value should be greater than ' + rules.minValue;
            return errMessage;
        }
    }
    if(rules.isNumeric) {
        const pattern = /^\d*$/;
        if(!pattern.test(value)) {
            errMessage = 'Value should be a Number';
            return errMessage
        }
    }
    if(rules.lettersOnly) {
        const pattern = /^[a-z]*$/i;
        if(!pattern.test(value)) {
            errMessage = 'Only letters are allowed';
        }
    }
    if(rules.email) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if(!pattern.test(value)) {
            errMessage = 'Please enter a valid email'
        }
    }
    return errMessage;
}