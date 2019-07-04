import React from 'react';
import { Header, Segment, Feed } from 'semantic-ui-react';
import EventActivityItem from './EventActivityItem';

const EventActivity = ({ activities }) => {
    return (
        <div>
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
        </div>
    )
}

export default EventActivity;