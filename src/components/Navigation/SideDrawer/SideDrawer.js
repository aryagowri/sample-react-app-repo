import React from 'react';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import styles from './SideDrawer.module.css';

const SideDrawer = props => {
    let classes = [styles.SideDrawer, styles.Close];
    if(props.showSideDrawer) {
        classes = [styles.SideDrawer, styles.Open];
    }
    return (
        <>
            <Backdrop show={props.showSideDrawer} clickHandler={props.hideSideDrawer} />
            <div className={classes.join(' ')} onClick={props.hideSideDrawer}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav className={styles.Nav}>
                    <NavItems />
                </nav>
            </div>
        </>
    );
}
export default SideDrawer;