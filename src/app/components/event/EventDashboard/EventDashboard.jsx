import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import { createEvent, updateEvent, deleteEvent } from '../../../actions/eventActions';
import cuid from 'cuid';

const mapState = (state) => ({
  events: state.events
})

const actions ={
  createEvent,
  updateEvent,
  deleteEvent
}

class EventDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      selectedEvent: null
    }
  }

  handleDeleteEvent = (eventId) => () => {
    this.props.deleteEvent(eventId);
  }

  handleFormOpen = () => {
    this.setState({
      selectedEvent: null,
      isOpen: true
    })
  }

  handleCancel = () => {
    this.setState({
      isOpen: false
    })
  }

  handleUpdateEvent = (updatedEvent) => {
    this.props.updateEvent(updatedEvent);
    this.setState({
      isOpen: false,
      selectedEvent: null
    })
  }

  handleEditEvent = (event) => () => {
    this.setState({
      selectedEvent: event,
      isOpen: true
    })
  }

  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/img/user.png';
    this.props.createEvent(newEvent);

    this.setState({
      isOpen: false
    })
  }
  
  render() {
    const {selectedEvent} = this.state;
    const {events} = this.props;
    return (
      <Grid>
          <Grid.Column width={6}>
            <Button positive content="Create Event" onClick={ this.handleFormOpen } />
            { this.state.isOpen && <EventForm selectedEvent={selectedEvent} createEvent={this.handleCreateEvent} handleCancel={this.handleCancel} updateEvent={this.handleUpdateEvent} /> }
          </Grid.Column>
          <Grid.Column width={10}>
            <EventList onEventEdit={this.handleEditEvent} events={events} deleteEvent={this.handleDeleteEvent}/>
          </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapState, actions)(EventDashboard);  