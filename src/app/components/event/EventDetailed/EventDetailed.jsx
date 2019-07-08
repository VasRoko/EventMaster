import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Container } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { goingToEvent, cancleGoingToEvent } from '../../../actions/userActions';
import { getSingleEvent} from '../../../actions/eventActions';

import { compose } from 'redux';
import { addEventComment } from '../../../actions/eventActions'
import { objectToArray, createDataTree } from '../../../common/util/helpers';
import LoadingComponent from '../../loading/LoadingComponent';

const actions = {
    goingToEvent,
    getSingleEvent,
    addEventComment,
    cancleGoingToEvent
}


const mapState = (state, ownProps) => {
    return {
        eventChat: !isEmpty(state.firebase.data.event_chat) && objectToArray(state.firebase.data.event_chat[ownProps.match.params.id]),
        auth: state.firebase.auth
    }
}

class EventDetailed extends Component  {
    state = {
        event: {},
    }

    async componentDidMount() {
        let eventData = await this.props.getSingleEvent(this.props.match.params.id);
        const eventId = this.props.match.params.id;

        this.setState({
            event: {
                id: eventId,
                ...eventData
            }
        })
    }

    render() {
        
        const { auth, goingToEvent, cancleGoingToEvent, addEventComment, eventChat } = this.props;
        const { event } = this.state;
        const attendees = event && event.attendees && objectToArray(event.attendees);
        const isHost = event.hostUid === auth.uid
        const isGoing = attendees && attendees.some(a => a.id === auth.uid);
        const chatData = !isEmpty(eventChat) && createDataTree(eventChat);

        if(Object.entries(event).length === 0) {
            return <LoadingComponent content="Loading event..." />
        }
        console.log(attendees)
        return (
            <Container>
                <Grid>
                    <Grid.Column width={10}>
                        <EventDetailedHeader event={event} isHost={isHost} isGoing={isGoing} goingToEvent={goingToEvent} cancleGoingToEvent={cancleGoingToEvent} /> 
                        <EventDetailedInfo event={event} />
                        <EventDetailedChat addEventComment={addEventComment} eventId={event.id} eventChat={chatData} />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <EventDetailedSidebar attendees={attendees} />
                    </Grid.Column>
                </Grid> 
            </Container>
        )
    }
}

export default compose(
    withFirestore,
    connect(mapState, actions),
    firebaseConnect((props) => ([`event_chat/${props.match.params.id}`]))
)(EventDetailed);