import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './containers/Login/Login';
import Layout from './containers/Layout/Layout';
import Careers from './components/Careers/Careers';
import Personal from './containers/ApplicationForm/Personal/Personal';
import Education from './containers/ApplicationForm/Education/Education';
import WorkHistory from './containers/ApplicationForm/WorkHistory/WorkHistory';
import Submit from './containers/ApplicationForm/Submit/Submit';

function App() {
  return (
    <Layout>
       <Route path='/' exact component={Home} />
       <Route path='/login' exact component={Login} />
       <Route path='/careers' exact component={Careers} />
       <Route path='/careers/xyz/1' component={Personal} />
       <Route path='/careers/xyz/2' component={Education} />
       <Route path='/careers/xyz/3' component={WorkHistory} />
       <Route path='/careers/xyz/4' component={Submit} />
       <Redirect to="/" exact />
    </Layout>
  );
}

export default App;
