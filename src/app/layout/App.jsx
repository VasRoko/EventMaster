import React, { Component } from 'react';
import EventDashboard from '../components/event/EventDashboard/EventDashboard';
import NavBar from '../components/nav/NavBar/NavBar';
import { Container } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div>
          <NavBar />
          <Container className="main" >
              <EventDashboard />
          </Container>
      </div>
    );
  }
}

export default App;
