import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { deleteEvent } from '../../../actions/eventActions';
import LoadingComponent from '../../loading/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

const mapStateToProps = (state) => ({
  events: state.firestore.ordered.events,
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
    const {events} = this.props;

    if (!isLoaded(events)) {
      return <LoadingComponent />
    } 

    return (
      <Grid>
          <Grid.Column width={3}>
            <EventActivity />
          </Grid.Column>
          <Grid.Column width={13}>
            <EventList events={events} deleteEvent={this.handleDeleteEvent}/>
          </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, actions)(
  firestoreConnect([{collection: 'events'}])(EventDashboard)
);  