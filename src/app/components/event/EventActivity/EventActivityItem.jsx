import React, { Component } from 'react'
import { Feed, Image, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import distanceInWords from 'date-fns/distance_in_words'; 

class EventActivityItem extends Component {
   
    renderSummary = activity => {
        switch (activity.type) {
            case 'newEvent' :
                return (
                    <div>
                        New Event!{' '}
                        <Feed.User
                            as={Link}
                            to={{ pathname: '/profile/' + activity.hostUid }}
                        >
                            {activity.hostedBy}
                        </Feed.User>
                        {' '}is hosting{' '}
                        <Link to={{ pathname: '/event/' + activity.eventId }}>
                            {activity.title}
                        </Link>
                    </div>
                )
            case 'cancelledEvent' :
                return (
                    <div>
                        Event Cancelled!{' '}
                        <Feed.User
                            as={Link}
                            to={{ pathname: '/profile/' + activity.hostUid }}
                        >
                            {activity.hostedBy}
                        </Feed.User>
                        {' '}has canceled{' '}
                        <Link to={{ pathname: '/events/' + activity.eventId }}>
                            {activity.title}
                        </Link>
                    </div>
                )
            case 'reActivatedEvent':
                return (
                    <div>
                        Event Recreated!{' '}
                        <Feed.User
                            as={Link}
                            to={{ pathname: '/profile/' + activity.hostUid }}
                        >
                            {activity.hostedBy}
                        </Feed.User>
                        {' '}has recreated {' '}
                        <Link to={{ pathname: '/events/' + activity.eventId }}>
                            {activity.title}
                        </Link>
                    </div>
                )
            default: 
                return;
        }
    }

    render() {
        const { activity } = this.props;
        return (
            <Feed.Event>
                <Feed.Label>
                    <Image src={activity.photoUrl || '/assets/user.png'} />
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                        { this.renderSummary(activity)}
                    </Feed.Summary>
                    <Feed.Meta>
                        <Feed.Date>
                            {distanceInWords(activity.timestamp && activity.timestamp.toDate(), Date.now())}
                            {' '}ago
                        </Feed.Date>
                    </Feed.Meta>
                </Feed.Content>
                <Divider />
            </Feed.Event>
        )
    }

}


export default EventActivityItem;