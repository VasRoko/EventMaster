import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import NavBar from '../components/nav/NavBar/NavBar';
import HomePage from '../components/home/HomePage';
import EventDashboard from '../components/event/EventDashboard/EventDashboard';
import EventDetailedPage from '../components/event/EventDetailed/EventDetailed';
import PeopleDashboard from '../components/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../components/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../components/user/Settings/SettingsDashboard';
import EventForm from '../components/event/EventForm/EventForm';

class App extends Component {
  render() {
    return (
      <div>
          <NavBar />
          <Container className="main" >
              <Route path='/' component={HomePage} exact={true}/>
              <Route path='/events' component={EventDashboard} />
              <Route path='/event/:id' component={EventDetailedPage} />
              <Route path='/people' component={PeopleDashboard} />
              <Route path='/profile/:id' component={UserDetailedPage} />
              <Route path='/settings' component={SettingsDashboard} />
              <Route path='/createEvent' component={EventForm} />
          </Container>
      </div>
    );
  }
}

export default App;
