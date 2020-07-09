import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.module.css';

const Modal = props => {
    let classes = [styles.Modal, styles.HideModal];
    if(props.show) {
        classes = [styles.Modal, styles.ShowModal];
    }
    return (
        <>
            <Backdrop show={props.show} clickHandler={props.backdropClickHandler} />
            <div className={classes.join(" ")}>
                {props.children}
            </div>
        </>
    );
}
export default Modal;