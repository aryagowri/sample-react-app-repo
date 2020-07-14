import React from 'react';
import Modal from '../../../UI/Modal/Modal';
import Button from '../../../UI/Button/Button';
import styles from './SubmitSuccess.module.css';

const SubmitSuccess = props => {
    const okBtnClickHandler = event => {
        props.history.replace('/');
        console.log('clicked')
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
export default SubmitSuccess;