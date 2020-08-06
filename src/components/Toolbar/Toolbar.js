import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../Logo/Logo';
import NavItems from '../Navigation/NavItems/NavItems';
import Button from '../UI/Button/Button';
import DrawerToggle from '../Navigation/SideDrawer/DrawerToggle/DrawerToggle';
import * as actions from '../../store/actions';
import styles from './Toolbar.module.css';

const Toolbar = props => {
    const LoginClickHandler = () => {
        props.history.push('/login');
    }
    return (
        <header className={styles.Toolbar}>
            <div className={`${styles.LogoContainer} ${styles.Size}`}>
                <DrawerToggle clickHandler={props.drawerClicked} />
                <NavLink to='/'><Logo /></NavLink>
                {props.isAuthUser ? <Button clickHandler={props.onLogout}>Logout</Button> 
                    : <Button clickHandler={LoginClickHandler}>Login</Button> }
            </div>
            <nav className={`${styles.NavContainer} ${styles.Size}`}>
                <NavItems />
            </nav>
        </header>
    );
}
const mapStateToProps = state => {
    return {
        isAuthUser: state.login.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch(actions.logout())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Toolbar));