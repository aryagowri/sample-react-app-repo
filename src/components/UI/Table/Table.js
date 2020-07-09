import React from 'react';
import styles from './Table.module.css';

const Table = props => (
    <table className={styles.Table}>
        <thead>
            <tr>
                {props.headings.map((heading,index) => (<th key={heading+index}>{heading}</th>))}
                <th></th>{/*for delete button*/}
            </tr>
        </thead>
        <tbody>
            {props.items.map((item, index) => (
                <tr key={index}>
                    {Object.keys(item).map(i => (
                        <td key={i+index}>{item[i]}</td>
                    ))}
                    {props.closeBtn ? <td><button onClick={() => props.deleteHandler(index)}>X</button></td> : null }
                </tr>
                )
            )}
        </tbody>
    </table>
);
export default Table;