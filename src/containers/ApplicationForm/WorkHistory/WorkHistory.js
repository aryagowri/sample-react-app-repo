import React from 'react';
import { connect } from 'react-redux';
import Modal from '../../../components/UI/Modal/Modal';
import Progress from '../../../components/UI/Progress/Progress';
import FormControl from '../../../components/UI/FormControl/FormControl';
import Button from '../../../components/UI/Button/Button';
import Table from '../../../components/UI/Table/Table';
import * as actions from '../../../store/actions';
import styles from './WorkHistory.module.css';

const WorkHistory = props => {

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
        props.onInputChange(name, value, 'work');
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
        props.onAddClick('work', workData)
        props.onResetClick('work');
    }
    const deleteHandler = index => {
        props.onTableDelete(index);
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
                <Progress stepNumber={2} stepNames={['Personal Details','Educational Details', 'Work History', 'Submit']} />
                <Progress stepNumber={2} stepNames={['1','2', '3', '4']} />               
            </div>
            <h5 className={styles.Heading}>Work History</h5>
            <form onSubmit={nextClickHandler} className={styles.Form}>
                {formArray.map(element =>
                    <FormControl attributes={element.desc.attribute} id={element.id} name={element.id} 
                        value={element.desc.value} controlType={element.controlType} onChange={changeHandler} 
                        label={element.desc.label} key={element.id} />
                )}
                <div className={styles.AddBtnContainer}>
                    <Button clickHandler={resetHandler}>Reset</Button>
                    <Button clickHandler={addHandler}>Add</Button>
                </div>
                <div className={styles.TableContainer}>
                    <Table closeBtn={true} headings={tableHeading} items={props.tableData} deleteHandler={deleteHandler}/>
                </div>
                <div className={styles.ButtonContainer}>
                        <Button clickHandler={backBtnHandler}>Back</Button>
                        <Button>Next</Button>
                </div>
            </form>
        </Modal>
    );
}
const mapStateToProps = state => {
    return {
        formData: state.appForm.formDetails.work,
        tableData: state.appForm.workData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onInputChange: (name, value, step) => dispatch(actions.inputValueChanged(name, value, step)),
        onResetClick: step => dispatch(actions.resetClicked(step)),
        onAddClick: (step, data) => dispatch(actions.addClicked(step, data)),
        onTableDelete: (step, index) => dispatch(actions.tableDeleteClicked(step, index))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WorkHistory);