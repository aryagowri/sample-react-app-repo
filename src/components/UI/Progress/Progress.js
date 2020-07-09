import React from 'react';
import styles from './Progress.module.css';

const Progress = props => {
    return (
        <ul className={styles.Progress}>
            {props.stepNames.map((stepName, index) => (
                <li className={props.stepNumber === index ? styles.Active : index < props.stepNumber ? styles.Completed : null }
                 key={index}>{stepName}</li>
            ))}
    </ul>
    );
}
export default Progress;