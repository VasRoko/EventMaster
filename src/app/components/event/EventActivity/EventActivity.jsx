import React from 'react';
import { Header, Segment, Feed, Sticky } from 'semantic-ui-react';
import EventActivityItem from './EventActivityItem';

const EventActivity = ({ activities, createRef }) => {
    return (
        <Sticky context={createRef} offset={100}>
            <Header attached='top' content='Recent Activity' />
            <Segment attached>
                <Feed>
                    { activities.length > 0 ? activities.map(item => 
                        <EventActivityItem key={item.id} activity={item} />
                    ) : <div>
                        <Header style={{ textAlign: 'center' }} as="h4" content="No Activities" />
                    </div> }
                </Feed>
            </Segment>
        </Sticky>
    )
}

export default EventActivity;