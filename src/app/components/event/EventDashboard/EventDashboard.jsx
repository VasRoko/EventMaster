import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { deleteEvent } from '../../../actions/eventActions';
import LoadingComponent from '../../loading/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

const mapState = (state) => ({
  events: state.events,
  loading: state.async.loading
})

const actions ={
  deleteEvent
}

class EventDashboard extends Component {

  handleDeleteEvent = (eventId) => () => {
    this.props.deleteEvent(eventId);
  }

  handleEditEvent = (event) => () => {
    this.setState({
      selectedEvent: event,
      isOpen: true
    })
  }

  render() {
    const {events, loading} = this.props;
    if (loading) {
      return <LoadingComponent />
    } 
    return (
      <Grid>
          <Grid.Column width={6}>
            <EventActivity />
          </Grid.Column>
          <Grid.Column width={10}>
            <EventList events={events} deleteEvent={this.handleDeleteEvent}/>
          </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapState, actions)(EventDashboard);  