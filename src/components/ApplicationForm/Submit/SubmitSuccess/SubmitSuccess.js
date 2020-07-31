import React from 'react';
import { connect } from 'react-redux';
import Modal from '../../../UI/Modal/Modal';
import Button from '../../../UI/Button/Button';
import * as actions from  '../../../../store/actions';
import styles from './SubmitSuccess.module.css';

const SubmitSuccess = props => {
    const okBtnClickHandler = event => {
        props.onOKBtnClick();
        props.history.replace('/');
    }
return (
    <Modal show={true}>
        <div className={styles.SubmitSuccess}>
            <p className={styles.Message}>Your application has been submitted.</p>
            <Button clickHandler={okBtnClickHandler}>OK</Button>
        </div>
    </Modal>
);
}
const mapDispatchToProps = dispatch => {
    return {
        onOKBtnClick: () => dispatch(actions.clearAllInput())
    }
}
export default connect(null, mapDispatchToProps)(SubmitSuccess);