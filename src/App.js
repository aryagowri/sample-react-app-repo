import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './containers/Login/Login';
import Layout from './containers/Layout/Layout';
import Careers from './components/Careers/Careers';
import Personal from './components/ApplicationForm/Personal/Personal';
import Education from './containers/ApplicationForm/Education/Education';
import WorkHistory from './containers/ApplicationForm/WorkHistory/WorkHistory';
import Submit from './components/ApplicationForm/Submit/Submit';
import ContactUs from './components/ContactUs/ContactUs';
import News from './components/News/News';
import * as actions from './store/actions';

function App(props) {

  const {autoLogin} = props;
  useEffect(() => {
    autoLogin();
  }, [autoLogin]); // to try auto log in if token and user id is available in localStorage

  return (
    <Layout>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/careers' exact component={Careers} />
        <Route path='/contactus' exact component={ContactUs} />
        <Route path='/news' exact component={News} />
        <Route path='/careers/xyz/1' component={Personal} />
        <Route path='/careers/xyz/2' component={Education} />
        <Route path='/careers/xyz/3' component={WorkHistory} />
        <Route path='/careers/xyz/4' component={Submit} />
        <Redirect to="/" exact/>
      </Switch>
    </Layout>
  );
}
const mapStateToProps = state => {
  return {

  }
}
const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => dispatch(actions.checkForAutoLogin())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
