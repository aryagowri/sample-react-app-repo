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
import SubmitSuccess from './components/ApplicationForm/Submit/SubmitSuccess/SubmitSuccess';
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
        { !props.isAuth && <Route path='/login' exact component={Login} /> }
        <Route path='/careers' exact component={Careers} />
        <Route path='/contactus' exact component={ContactUs} />
        <Route path='/news' exact component={News} />
        <Route path='/careers/xyz/1' component={Personal} />
        {/*Authenticated users can access Education step of form, only if personal step of form is completed */}
        { props.isAuth && props.isPersonalValid && <Route path='/careers/xyz/2' component={Education} /> }
        { props.isAuth && props.isEducationValid && <Route path='/careers/xyz/3' component={WorkHistory} /> }
        { props.isAuth && props.isWorkValid && <Route path='/careers/xyz/4' component={Submit} /> }
        { props.isSubmitted && <Route path='/submitsuccess' component={SubmitSuccess} /> }
        <Redirect to="/" exact/>
      </Switch>
    </Layout>
  );
}
const mapStateToProps = state => {
  return {
    isAuth: state.login.token !== null,
    isPersonalValid: state.appForm.isFormValid.personal,
    isEducationValid: state.appForm.isFormValid.education,
    isWorkValid: state.appForm.isFormValid.work,
    isSubmitted: state.appForm.submitted
  }
}
const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => dispatch(actions.checkForAutoLogin())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
