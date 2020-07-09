import React, { useState } from 'react';
import styles from './Input.module.css';
import FormControl from '../FormControl/FormControl';

const Input = props => {
    const [input, setInput] = useState({
        name : {
            controlType: 'input',
            controlAttributes: {
                type: 'text',
                placeholder: 'your name'
            },
            value: ''
        },
        password: {
            controlType: 'input',
            controlAttributes: {
                type: 'checkbox',
                placeholder: 'your name'
            },
            value: ''
        },
        email: {
            controlType: 'input',
            controlAttributes: {
                type: 'email',
                placeholder: 'your name'
            },
            value: ''
        }
    });
    let formArray = [];
    for (let key in input){
        formArray.push({
            id: key,
            config: input[key]
        })
    }

    return (
        <form style={{width:'100%', margin: '0 auto'}}>
        {formArray.map(element => (
            <FormControl controlType={element.controlType} value={element.config.value}
            onChange ={props.onChange} name ={"test"} label ={"test"} attributes={element.config.controlAttributes} />
        ))}
        </form>
    );
}
export default Input;