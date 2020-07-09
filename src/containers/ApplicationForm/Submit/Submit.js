import React from 'react';
import { connect } from 'react-redux';
import Modal from '../../../components/UI/Modal/Modal';
import Progress from '../../../components/UI/Progress/Progress';
import Button from '../../../components/UI/Button/Button';
import * as actions from '../../../store/actions';
import Table from '../../../components/UI/Table/Table';
import styles from './Submit.module.css';

const Submit = props => {
    const backBtnHandler = event => {
        event.preventDefault();
        props.history.goBack();
    }
    const closeBtnHandler = event => {
        event.preventDefault();
        props.history.replace('/careers');
    }
    const submitClickHandler = event => {
        event.preventDefault();
        let personalData = {};
        for(let key in props.personalForm) {
            personalData = {
                ...personalData,
                [key]: props.personalForm[key].value
            }
        }
        let data = {
            email: props.email,
            personal: personalData,
            education: props.educationForm,
            work: props.workForm
        }
        props.onSubmit(props.token, data);        
    }
    return (
        <Modal show='true' backdropClickHandler={closeBtnHandler}>
            <div className={styles.CloseButton}><Button clickHandler={closeBtnHandler}>&times;</Button></div>
            <h4 className={styles.Heading}>Application Form</h4>
            <div className={styles.ProgressContainer}>
                <Progress stepNumber={3} stepNames={['Personal Details','Educational Details', 'Work History', 'Submit']} />
                <Progress stepNumber={3} stepNames={['1','2', '3', '4']} />               
            </div>
            <h5 className={styles.Heading}>Confirm and Submit</h5>
            <div className={styles.Container}>
                <form onSubmit={submitClickHandler}>
                    <div>
                        <h5>Personal Details</h5>
                        {Object.keys(props.personalForm).map(key => 
                            <p key={key}><strong>{props.personalForm[key].label}</strong><span>{props.personalForm[key].value}</span></p> 
                        )}
                    </div>
                    <h5>Educational Details</h5>
                    <div className={styles.TableContainer}>
                        <Table closeBtn={false} headings={['Degree', 'Year of Completion', 'Institution']} items={props.educationForm} />
                    </div>
                    <h5>Work History</h5>
                    <div className={styles.TableContainer}>
                        <Table closeBtn={false} headings={['Employer', 'Position', 'Experience in Months']} items={props.workForm} />
                    </div>
                    <div className={styles.ButtonContainer}>
                        <Button clickHandler={backBtnHandler}>Back</Button>
                        <Button>Submit</Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
const mapStateToProps = state => {
    return {
        personalForm: state.appForm.formDetails.personal,
        educationForm: state.appForm.educationData,
        workForm: state.appForm.workData,
        token: state.login.token,
        email: state.login.email
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (token, data) => dispatch(actions.formSubmit(token, data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Submit);