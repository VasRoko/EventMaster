import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';

class EventDashboard extends Component {
  render() {
    return (
      <Grid>
          <Grid.Column width={6}>
            <h2>Left Colum</h2>
          </Grid.Column>
          <Grid.Column width={10}>
            <EventList />
          </Grid.Column>
      </Grid>
    )
  }
}

export default EventDashboard;