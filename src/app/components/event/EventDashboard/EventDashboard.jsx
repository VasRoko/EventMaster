import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid, Segment, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { getEvents } from '../../../actions/eventActions';
import LoadingComponent from '../../loading/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

const mapStateToProps = (state) => ({
  events: state.events,
  loading: state.async.loading
})

const actions ={
  getEvents
}

class EventDashboard extends Component {
  state = { 
    getAllEvents: false,
  }

  componentDidMount() {
    this.props.getEvents(this.state.getAllEvents);
  }

  handleEditEvent = (event) => () => {
    this.setState({
      selectedEvent: event,
    })
  }

  handleGetAllEvents = () => {
    this.setState({
      getAllEvents: true,
    }, () => {
      this.props.getEvents(this.state.getAllEvents);
    })
  }

  handleGetFutureEvents = () => {
    this.setState({
      getAllEvents: false,
    }, () => {
      this.props.getEvents(this.state.getAllEvents);
    })
  }

  render() {
    const {events, loading} = this.props;

    if (loading) {
      return <LoadingComponent />
    } 

    return (
      <Grid>
          <Grid.Column width={3}>
            <EventActivity />
          </Grid.Column>
          <Grid.Column width={13}>
            <Segment>
              <Button.Group basic>
                <Button active={!this.state.getAllEvents} onClick={this.handleGetFutureEvents}>Future Events</Button>
                <Button active={this.state.getAllEvents} onClick={this.handleGetAllEvents}>All Events</Button>
              </Button.Group>
            </Segment>
            <EventList events={events}/>
          </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, actions)(
  firestoreConnect([{collection: 'events'}])(EventDashboard)
);  