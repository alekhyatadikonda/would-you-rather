import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getInitialData } from '../actions';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard';
import LeaderBoard from './LeaderBoard';
import Login from './Login';
import NavigationTopBar from './NavigationTopBar';
import AddQuestion from './AddQuestion';
import QuestionContainer from './QuestionContainer';
import PageNotFound from './PageNotFound'
class App extends Component {

  componentDidMount() {
    this.props.dispatch(getInitialData())
  }

  render() {
    const { userLoggedIn } = this.props;

    return (
      <Router>
          <div className='container'>
              <NavigationTopBar />
              <div>
                <Switch>
                  <Route path='/login' exact component={Login} />
                  <Route path='/' exact component={Login} />
                  <ProtectedRoute path='/home' exact component={Dashboard} loggedIn={userLoggedIn} />
                  <ProtectedRoute path='/questions/:id' exact component={QuestionContainer} loggedIn={userLoggedIn} />
                  <ProtectedRoute path='/add' exact component={AddQuestion} loggedIn={userLoggedIn} />
                  <ProtectedRoute path='/leaderboard' exact component={LeaderBoard} loggedIn={userLoggedIn} />
                  <Route component={PageNotFound} />
                </Switch>
              </div>
          </div>
      </Router>
    );
  }
}

function mapStateToProps({ authorizedUser }) {
  return {
    userLoggedIn: authorizedUser? authorizedUser : null,
  };
}

export default connect(mapStateToProps)(App);
