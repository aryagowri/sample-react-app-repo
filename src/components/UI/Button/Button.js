import React from 'react';
import styles from './Button.module.css';

const Button = props => (
    <button className={styles.Button} onClick={props.clickHandler} disabled={props.disabled}> {props.children} </button>
);
export default Button;