import React, { Component } from 'react';
import { Route, Switch, withRouter  } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ReduxToastr from 'react-redux-toastr'

import NavBar from '../components/nav/NavBar/NavBar';
import HomePage from '../components/home/HomePage';
import EventDashboard from '../components/event/EventDashboard/EventDashboard';
import EventDetailedPage from '../components/event/EventDetailed/EventDetailed';
import PeopleDashboard from '../components/user/PeopleDashboard/PeopleDashboard';
import UserProfilePage from '../components/user/UserProfile/UserProfilePage';
import SettingsDashboard from '../components/user/Settings/SettingsDashboard';
import EventForm from '../components/event/EventForm/EventForm';
import ModelManager from '../modals/ModalManager';
import PageNotFound from '../components/pagenotfound/PageNotFound'

class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route path='/' component={HomePage} exact />
        </Switch>
        <Route path='/(.+)' render={() => (
          <Container className="main">
              <div>
                <NavBar />
                <ModelManager />
                <ReduxToastr
                        timeOut={4000}
                        newestOnTop={false}
                        preventDuplicates
                        position="bottom-right"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                        closeOnToastrClick/>
                <Switch>
                  <Route path='/' component={HomePage} exact />
                  <Route path='/events' component={EventDashboard} exact />
                  <Route path='/events/:id' component={EventDetailedPage} />
                  <Route path='/manage/:id' component={EventForm} />
                  <Route path='/people' component={PeopleDashboard} />
                  <Route path='/profile/:id' component={UserProfilePage} />
                  <Route path='/settings' component={SettingsDashboard} />
                  <Route path='/createEvent' component={EventForm} />
                  <Route component={PageNotFound} />
                </Switch>
              </div>
          </Container>
        )}/>
      </div>
    );
  }
}

export default App;
