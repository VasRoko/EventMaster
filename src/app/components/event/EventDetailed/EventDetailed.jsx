import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { withFirestore } from 'react-redux-firebase';
import { errorNotification } from '../../../common/notifications/notification';
import { auth } from 'firebase';
import { goingToEvent } from '../../../actions/userActions';

const actions = {
    goingToEvent
}

const mapState = (state, ownProps) => {
    const eventId = ownProps.match.params.id;
    let event = {};

    if (state.firestore.ordered.events && state.firestore.ordered.events.length > 0) {
        event = state.firestore.ordered.events.filter(event => event.id === eventId)[0] || {};
    }
    
    return {
        event,
        auth: state.firebase.auth
    }
}

class EventDetailed extends Component  {
    async componentDidMount() {
        const {firestore, match }  = this.props;
        await firestore.setListener(`events/${match.params.id}`);
    }

    async componentWillUnmount() {
        const {firestore, match }  = this.props;
        await firestore.unsetListener(`events/${match.params.id}`);
    }
    render() {
        const { event, auth, goingToEvent } = this.props;
        const attendees = event && event.attendees && Object.entries(event.attendees).map(attendee => 
            Object.assign({}, attendee[1], {id: attendee[0]})
        );
        const isHost = event.hostUid === auth.uid
        const isGoing = attendees && attendees.some(a => a.id === auth.uid)
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventDetailedHeader event={event} isHost={isHost} isGoing={isGoing} goingToEvent={goingToEvent} /> 
                    <EventDetailedInfo event={event} />
                    <EventDetailedChat />
                </Grid.Column>
                <Grid.Column width={6}>
                    <EventDetailedSidebar attendees={attendees} />
                </Grid.Column>
            </Grid>
        )
    }
}

export default withFirestore(connect(mapState, actions)(EventDetailed));