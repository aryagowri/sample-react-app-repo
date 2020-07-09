import React from 'react';
import styles from './FormControl.module.css';

const FormControl = props => {
    let formControl = null;
    const classes = [styles.InputElement];
    console.log('touched', props.touched)
    if(props.errorMsg !== '' && props.touched) {
        classes.push(styles.Invalid);
    }
    switch(props.controlType) {
        case('select'):
            formControl = (<select className={classes.join(' ')} value= {props.value} name={props.name} onChange={props.onChange} >
            {props.attributes.options.map(option => (
                <option value={option.value} key={option.value}>{option.value}</option>
            ))}
        </select>);
        break;
        case('textarea'):
            formControl = <textarea className={classes.join(' ')} value= {props.value} onChange={props.onChange} {...props.attributes} />;
            break;
        default:
            formControl = <input className={classes.join(' ')} id={props.id} name={props.name} value={props.value} onChange={props.onChange} {...props.attributes} />;
    }
    return (
        <div className={styles.InputContainer}>
        <label htmlFor={props.name}>{props.label}</label>
        {props.errorMsg !== '' ? <span className={styles.ErrorMessage}>{props.errorMsg}</span> : null }
        {formControl}
        </div>
    );
}
export default FormControl;