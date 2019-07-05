import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid, Button, Divider } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { getEvents } from '../../../actions/eventActions';
import LoadingComponent from '../../loading/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

const mapStateToProps = (state) => ({
  events: state.events,
  loading: state.async.loading,
  activities: state.firestore.ordered.activity
})

const actions ={
  getEvents
}

const query = [{
  collection: 'activity',
  orderBy: ['timestamp', 'desc'],
  limit: 5
}]

class EventDashboard extends Component {

  contextRef = createRef();

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

  async componentDidUpdate(prevProps) {
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
    }, () => {
      // this.props.getEvents(this.state.getAllEvents)
    })
  }

  handleGetFutureEvents = () => {
    this.setState({
      getAllEvents: false,
    }, () => {
      console.log(this.state.getAllEvents)
      // this.props.getMoreEvents()
    })
  }

  render() {
    const {loading, activities} = this.props;
    const { moreEvents, loadedEvents } = this.state;
    
    if (this.state.loadingInitial) {
      return <LoadingComponent />
    } 

    return (
      <Grid>
          <Grid.Column width={5}>
            <EventActivity createRef={this.createRef} activities={activities} />
          </Grid.Column>
          <Grid.Column width={11}>
              <Button.Group basic>
                <Button active={!this.state.getAllEvents} onClick={this.handleGetFutureEvents}>Future Events</Button>
                <Button active={this.state.getAllEvents} onClick={this.handleGetAllEvents}>All Events</Button>
              </Button.Group>
              <Divider />
              <div ref={this.createRef}>
              <EventList loading={loading} getMoreEvents={this.getMoreEvents} moreEvents={moreEvents} events={loadedEvents}/>
              </div>
              <Divider />
          </Grid.Column>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column style={{ textAlign: 'center'}} width={13}>
              {
                loading && <LoadingComponent style={{ textAlign: 'center'}} /> 
              }
          </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, actions)(
  firestoreConnect(query)(EventDashboard)
);  