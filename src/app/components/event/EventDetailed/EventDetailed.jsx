import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { withFirestore } from 'react-redux-firebase';
import { errorNotification } from '../../../common/notifications/notification';

const mapState = (state, ownProps) => {
    const eventId = ownProps.match.params.id;
    let event = {};

    if (state.firestore.ordered.events && state.firestore.ordered.events.length > 0) {
        event = state.firestore.ordered.events.filter(event => event.id === eventId)[0] || {};
    }
    
    return {
        event
    }
}

class EventDetailed extends Component  {
    async componentDidMount() {
        const {firestore, match, history  }  = this.props;
        let storeEvent = await firestore.get(`events/${match.params.id}`);

        if (storeEvent.exists !== true ) {
            history.push('/events/');
            errorNotification();
        }
}
    render() {
        const { event } = this.props;
        const attendees = event && event.attendees && Object.entries(event.attendees).map(attendee => 
            Object.assign({}, attendee[1], {id: attendee[0]})
        );

        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventDetailedHeader event={event} /> 
                    <EventDetailedInfo event={event}/>
                    <EventDetailedChat />
                </Grid.Column>
                <Grid.Column width={6}>
                    <EventDetailedSidebar attendees={attendees} />
                </Grid.Column>
            </Grid>
        )
    }
}

export default withFirestore(connect(mapState)(EventDetailed));