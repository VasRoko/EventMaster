import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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

class App extends Component {

  render() {
    return (
      <div>
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
          <Route path='/' component={HomePage} exact={true}/>
        </Switch>
        <Route path='/(.+)' render={() => (
          <div>
            <NavBar />
            <Container className="main" >
                <Switch>
                  <Route path='/' component={HomePage} exact={true}/>
                  <Route path='/events' component={EventDashboard} />
                  <Route path='/event/:id' component={EventDetailedPage} />
                  <Route path='/manage/:id' component={EventForm} />
                  <Route path='/people' component={PeopleDashboard} />
                  <Route path='/profile/:id' component={UserProfilePage} />
                  <Route path='/settings' component={SettingsDashboard} />
                  <Route path='/createEvent' component={EventForm} />
                </Switch>
            </Container>
          </div>
        )}/>
      </div>
    );
  }
}

export default App;
