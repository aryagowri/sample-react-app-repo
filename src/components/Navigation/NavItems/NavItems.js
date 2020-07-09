import React from 'react';
import NavItem from './NavItem/NavItem';
import styles from './NavItems.module.css';

const NavItems = props => (
    <ul className={styles.NavItems}>
        <NavItem link="/">Home</NavItem>
        <NavItem link="/careers">Careers</NavItem>
        <NavItem link="/">Contact Us</NavItem>
        <NavItem link="/">News Releases</NavItem>
    </ul>
);
export default NavItems;