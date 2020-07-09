import React from 'react';
// import { NavLink } from 'react-router-dom';
import NavItem from '../Navigation/NavItems/NavItem/NavItem';
import styles from './Careers.module.css';

const Careers = props => {
    return (
        <div className={styles.Careers}>
            <ul>
                <NavItem link={props.match.url + '/xyz/1'}>Recruitment for the post of XYZ. Click here to Apply</NavItem>
            </ul>
        </div>
    );
}
export default Careers;