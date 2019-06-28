import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid, Button, Divider } from 'semantic-ui-react';
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
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: [],
  }

  async componentDidMount() {
    let next = await this.props.getEvents(this.state.getAllEvents);

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      })
    }
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.events !== prevProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...this.props.events]
      })
    }
  }

  getMoreEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length -1];
    let next = await this.props.getEvents(this.state.getAllEvents, lastEvent);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      })
    }
  }

  handleEditEvent = (event) => () => {
    this.setState({
      selectedEvent: event,
    })
  }

  handleGetAllEvents = () => {
    this.setState({
      getAllEvents: true,
      moreEvents: true
    })
  }

  handleGetFutureEvents = () => {
    this.setState({
      getAllEvents: false,
      moreEvents: true
    })
  }

  render() {
    const {loading} = this.props;

    if (this.state.loadingInitial) {
      return <LoadingComponent />
    } 

    return (
      <Grid>
          <Grid.Column width={3}>
            <EventActivity />
          </Grid.Column>
          <Grid.Column width={13}>
              <Button.Group basic>
                <Button active={!this.state.getAllEvents} onClick={this.handleGetFutureEvents}>Future Events</Button>
                <Button active={this.state.getAllEvents} onClick={this.handleGetAllEvents}>All Events</Button>
              </Button.Group>
              <Divider />
              <EventList events={this.state.loadedEvents}/>
              <Divider />
              <Button onClick={this.getMoreEvents} disabled={!this.state.moreEvents} color='green' loading={loading} content="More Events" />
          </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, actions)(
  firestoreConnect([{collection: 'events'}])(EventDashboard)
);  