import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from '../../../components/UI/Modal/Modal';
import Progress from '../../../components/UI/Progress/Progress';
import FormControl from '../../../components/UI/FormControl/FormControl';
import Button from '../../../components/UI/Button/Button';
import Table from '../../../components/UI/Table/Table';
import * as actions from '../../../store/actions'; 
import { checkValidity } from '../../../Utility/utility';
import styles from './Education.module.css';

const Education = props => {
    const [maxRecords, setMaxRecords] = useState(false);//to set maximum number of rows that can be added in education tab(application form)
    useEffect(()=> {
        let isValid = true;
        for(let key in  props.formData){
            isValid = isValid && props.formData[key].errorMsg === '' && props.formData[key].touched;
        }
        props.isFormValid('education', isValid);//will be set to true if all fields are valid
    })
    const backBtnHandler = event => {
        event.preventDefault();
        props.history.goBack();
    }
    const closeBtnHandler = event => {
        event.preventDefault();
        props.history.replace('/careers');
    }
    const changeHandler = event => {
        const {name, value} = event.target;
        const errorMsg = checkValidity(value, props.formData[name].validation);
        props.onInputChange(name, value, errorMsg, 'education');
    }
    const resetHandler = event => {
        event.preventDefault();
        props.onResetClick('education');
    }
    const addHandler = e => {
        e.preventDefault();
        const eduData = {
                degree: props.formData.degree.value,
                yearOfCompletion: props.formData.yearOfCompletion.value,
                institution: props.formData.institution.value
        }
        if(props.tableData.length < 3) {
            props.onAddClick('education', eduData);
            props.onResetClick('education');
        }
        else {
            setMaxRecords(true);
        }
    }
    const deleteHandler = index => {
        props.onTableDelete('education', index);
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
    const nextClickHandler = event => {
        event.preventDefault();
        props.history.push('/careers/xyz/3');
    }
    return (
        <Modal show='true' backdropClickHandler={closeBtnHandler}>
            <div className={styles.CloseButton}><Button clickHandler={closeBtnHandler}>&times;</Button></div>
            <h4 className={styles.Heading}>Application Form</h4>
            <div className={styles.ProgressContainer}>
                {/**first Progress is for devices with width > 600px **/
                 /*** second Progress is for device width < 600px*/ }
                <Progress stepNumber={1} stepNames={['Personal Details','Educational Details', 'Work History', 'Submit']} />
                <Progress stepNumber={1} stepNames={['1','2', '3', '4']} />               
            </div>
            <h5 className={styles.Heading}>Educational Details</h5>
            <form onSubmit={nextClickHandler}>
                {formArray.map(element =>
                    <FormControl attributes={element.desc.attribute} id={element.id} name={element.id} 
                        value={element.desc.value} controlType={element.desc.controlType} onChange={changeHandler} 
                        label={element.desc.label} key={element.id} touched={element.desc.touched}
                        errorMsg={element.desc.errorMsg} />
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
        formData: state.appForm.formDetails.education,//fetch education fields data from redux
        tableData: state.appForm.educationData,//data added to table
        isValid: state.appForm.isFormValid.education//to check if all fields are valid
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
export default connect(mapStateToProps, mapDispatchToProps)(Education);