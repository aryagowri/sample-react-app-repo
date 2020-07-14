/*** Personal Details step in Application Form***/

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from '../../UI/Modal/Modal';
import Progress from '../../UI/Progress/Progress';
import FormControl from '../../UI/FormControl/FormControl';
import Button from '../../UI/Button/Button';
import * as actions from '../../../store/actions';
import { checkValidity } from '../../../Utility/utility';
import styles from './Personal.module.css';

const Personal = props => { 

    useEffect(()=> {
        let isValid = true;
        for(let key in  props.formData){
            isValid = isValid && props.formData[key].errorMsg === '' && props.formData[key].touched;
        }
        props.isFormValid('personal', isValid);
    })
    const closeBtnHandler = () => {
        props.history.goBack();
    }
    const changeHandler = event => {
        const {name, value} = event.target;
        const errorMsg = checkValidity(value, props.formData[name].validation);
        props.onInputChange(name, value, errorMsg, 'personal');        
    }
    let formArray = [];
    for(let element in props.formData) {
        formArray.push({
            id: element,
            desc: props.formData[element]
        })
    }
    const resetHandler = event => {
        event.preventDefault();
        props.onResetClick('personal')
    }
    const nextClickHandler = event => {
        event.preventDefault();
        props.history.push('/careers/xyz/2')
    }
    return (
        <Modal show='true' backdropClickHandler={closeBtnHandler}>
            <div className={styles.CloseButton}><Button clickHandler={closeBtnHandler}>&times;</Button></div>
            <h4 className={styles.Heading}>Application Form</h4>
            <div className={styles.ProgressContainer}>
                {/**first Progress is for devices with width > 600px **/
                 /*** second Progress is for device width < 600px*/ }
                <Progress stepNumber={0} stepNames={['Personal Details','Educational Details', 'Work History', 'Submit']} />
                <Progress stepNumber={0} stepNames={['1','2', '3', '4']} />               
            </div>
            <h5 className={styles.Heading}>Personal Details</h5>
            <form onSubmit={nextClickHandler}>
                {formArray.map(element =>
                    <FormControl attributes={element.desc.attribute} id={element.id} name={element.id} 
                        value={element.desc.value} controlType={element.controlType} onChange={changeHandler} 
                        label={element.desc.label} key={element.id} touched={element.desc.touched}
                         errorMsg={element.desc.errorMsg} />
                )}
                <div className={styles.ButtonContainer}>
                    <Button clickHandler={resetHandler}>Reset</Button>
                    <Button disabled={!props.isValid}>Next</Button>
                </div>
            </form>
        </Modal>
    );
}
const mapStateToProps = state => {
    return {
        formData: state.appForm.formDetails.personal,
        isValid: state.appForm.isFormValid.personal
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onInputChange: (name, value, errorMsg, step) => dispatch(actions.inputValueChanged(name, value, errorMsg, step)),
        onResetClick: step => dispatch(actions.resetClicked(step)),
        isFormValid: (step, isValid) => dispatch(actions.isFormValid(step, isValid))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Personal);