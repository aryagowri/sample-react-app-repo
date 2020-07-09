import React, { useState, useRef, useEffect } from 'react';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../components/Footer/Footer';
import styles from './Layout.module.css';

const Layout = props => {
    const [sideDrawerShow, setSideDrawerShow] = useState(false);
    const sideDrawerShowRef = useRef();
    useEffect(() => {
        sideDrawerShowRef.current = sideDrawerShow;
    })
    const sideDrawerHandler = () => {
        setSideDrawerShow(true);
    }
    const closeSideDrawer = () => {
        setSideDrawerShow(!sideDrawerShowRef.current);
    }
    return (
        <>
            <Toolbar drawerClicked={sideDrawerHandler} />
            <SideDrawer showSideDrawer={sideDrawerShow} hideSideDrawer={closeSideDrawer}/>
            <main className={styles.MainContent}>{props.children}</main>
            <Footer />
        </>
    );
}
export default Layout;