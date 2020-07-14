import React from 'react';
import { connect } from 'react-redux';
import NavItem from '../Navigation/NavItems/NavItem/NavItem';
import styles from './Careers.module.css';

const Careers = props => {
    return (
        <div className={styles.Careers}>
            <ul>
                <NavItem link={ props.loggedIn ? props.match.url + '/xyz/1' : '/login'}>Recruitment for the post of XYZ. Click here to Apply</NavItem>
            </ul>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        loggedIn: state.login.token !== null
    }
}

export default connect(mapStateToProps)(Careers);