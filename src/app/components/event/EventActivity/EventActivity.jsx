import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

const EventActivity = () => {
    return (
        <div>
            <Header attached='top' content='Recent Activity' />
            <Segment attached>
                <span>Recent Activity </span>
            </Segment>
        </div>
    )
}

export default EventActivity;