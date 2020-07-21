import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { checkValidity } from '../../../Utility/utility';
import Modal from '../../../components/UI/Modal/Modal';
import Progress from '../../../components/UI/Progress/Progress';
import FormControl from '../../../components/UI/FormControl/FormControl';
import Button from '../../../components/UI/Button/Button';
import Table from '../../../components/UI/Table/Table';
import * as actions from '../../../store/actions';
import styles from './WorkHistory.module.css';
/***Work History tab in form */
const WorkHistory = props => {
    const [maxRecords, setMaxRecords] = useState(false);
    useEffect(()=> {
        let isValid = true;
        for(let key in  props.formData){
            isValid = isValid && props.formData[key].errorMsg === '' && props.formData[key].touched;
        }
        props.isFormValid('work', isValid);//set to true if all form fields are valid
    })
    const backBtnHandler = event => {
        event.preventDefault();
        props.history.goBack();
    }
    const closeBtnHandler = event => {
        event.preventDefault();
        props.history.replace('/careers');
    }
    const resetHandler = event => {
        event.preventDefault();
        props.onResetClick('work')
    }

    const changeHandler = event => {
        const {name, value} = event.target;
        const errorMsg = checkValidity(value, props.formData[name].validation);
        props.onInputChange(name, value, errorMsg, 'work');
    }
    const nextClickHandler = event => {
        event.preventDefault();
        props.history.push('/careers/xyz/4')
    }
    const addHandler = e => {
        e.preventDefault();
        const workData = {
            employer: props.formData.employer.value,
            position: props.formData.position.value,
            experience: props.formData.experience.value
        }
        if( props.tableData.length < 3) {
            props.onAddClick('work', workData)
            props.onResetClick('work');
        }
        else {
            setMaxRecords(true);
        }
    }
    const deleteHandler = index => {
        props.onTableDelete('work', index);
    }
    let formArray = [];
    let tableHeading =[];
    for(let element in props.formData) {
        tableHeading.push(props.formData[element].label);
        formArray.push({
            id: element,
            desc: props.formData[element]
        })
    }
    return (
        <Modal show='true' backdropClickHandler={closeBtnHandler}>
            <div className={styles.CloseButton}><Button clickHandler={closeBtnHandler}>&times;</Button></div>
            <h4 className={styles.Heading}>Application Form</h4>
            <div className={styles.ProgressContainer}>
                {/**first Progress is for devices with width > 600px **/
                 /*** second Progress is for device width < 600px*/ }
                <Progress stepNumber={2} stepNames={['Personal Details','Educational Details', 'Work History', 'Submit']} />
                <Progress stepNumber={2} stepNames={['1','2', '3', '4']} />               
            </div>
            <h5 className={styles.Heading}>Work History</h5>
            <form onSubmit={nextClickHandler} className={styles.Form}>
                {formArray.map(element =>
                    <FormControl attributes={element.desc.attribute} id={element.id} name={element.id} 
                        value={element.desc.value} controlType={element.controlType} onChange={changeHandler} 
                        label={element.desc.label} key={element.id} errorMsg={element.desc.errorMsg} />
                )}
                <div className={styles.AddBtnContainer}>
                    {maxRecords ? <p className={styles.ErrorMsg}>You can't add more than 3 records.</p> : null}
                    <Button clickHandler={resetHandler}>Reset</Button>
                    <Button clickHandler={addHandler} disabled={!props.isValid}>Add</Button>
                </div>
                <div className={styles.TableContainer}>
                    <Table closeBtn={true} headings={tableHeading} items={props.tableData} deleteHandler={deleteHandler}/>
                </div>
                <div className={styles.ButtonContainer}>
                        <Button clickHandler={backBtnHandler}>Back</Button>
                        <Button disabled={!(props.tableData.length > 0)}>Next</Button>
                </div>
            </form>
        </Modal>
    );
}
const mapStateToProps = state => {
    return {
        formData: state.appForm.formDetails.work,//work history related input fields data
        tableData: state.appForm.workData,//data added to Table in work history tab
        isValid: state.appForm.isFormValid.work //is true if all fields are valid
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onInputChange: (name, value, errorMsg, step) => dispatch(actions.inputValueChanged(name, value, errorMsg, step)),
        onResetClick: step => dispatch(actions.resetClicked(step)),
        onAddClick: (step, data) => dispatch(actions.addClicked(step, data)),
        onTableDelete: (step, index) => dispatch(actions.tableDeleteClicked(step, index)),
        isFormValid: (step, isValid) => dispatch(actions.isFormValid(step, isValid))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WorkHistory);