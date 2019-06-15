import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { withFirestore } from 'react-redux-firebase';

const mapState = (state, ownProps) => {
    const eventId = ownProps.match.params.id;
    let event = {};

    if (state.firestore.ordered.events && state.firestore.ordered.events.length > 0) {
        event = state.firestore.ordered.events.filter(event => event.id === eventId)[0];
    }
    
    return {
        event
    }
}

class EventDetailed extends Component  {
    async componentDidMount() {
        const { firestore, match, history  }  = this.props;
        let event = await firestore.get(`events/${match.params.id}`);
        if (!event.exists) {
            history.push('/events');
        }
    }
    render() {
        const {event} = this.props;
        console.log(event)
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventDetailedHeader event={event} /> 
                    <EventDetailedInfo event={event}/>
                    <EventDetailedChat />
                </Grid.Column>
                <Grid.Column width={6}>
                    <EventDetailedSidebar attendees={event.attendees} />
                </Grid.Column>
            </Grid>
        )
    }
}

export default withFirestore(connect(mapState)(EventDetailed));