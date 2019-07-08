import React from 'react';
import { Link } from 'react-router-dom'
import { Segment, List, Label, Image } from 'semantic-ui-react';

const EventDetailedSidebar = ({ attendees }) => {
    return (
        <div>
            <Segment
                textAlign="center"
                style={{ border: 'none' }}
                attached="top"
                secondary
                inverted
                color="teal">
                {attendees && attendees.length} { attendees && attendees.length ===  1 ? 'Person' : 'People' } Going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    { attendees && Object.values(attendees).map((attendee) => 
                        <Label style={{ margin: '2px' }} key={attendee.id} as={Link} to={`/profile/${attendee.id}`} image color={ attendee.host ? 'blue' : 'grey' }>
                            <Image  size='tiny' src={ attendee.photoURL || '/assets/img/user.png'} />
                            { attendee.displayName }
                            { attendee.host && <Label.Detail>Host</Label.Detail> }
                        </Label>                    
                    )} 
                </List>
            </Segment>
        </div>
    )
}

export default EventDetailedSidebar;