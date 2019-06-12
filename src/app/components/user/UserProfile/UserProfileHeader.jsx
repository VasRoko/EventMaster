import React from 'react'
import { differenceInYears } from 'date-fns';
import { Segment, Item, Divider } from 'semantic-ui-react';

const UserProfileHeader = ({ user }) => {
    return (
        <Segment attached>
            <Item.Group>
            <Item>
                <Item.Image size='small' rounded src={ user.photoURL || '/assets/img/user.png'} />
                <Item.Content>
                    <Item.Header as='a'>{ user.displayName || 'Unknown Name' }</Item.Header>
                    {/* <Item.Meta>About Me</Item.Meta> */}
                    <Divider/>
                    <Item.Description>
                        <p><strong>Occupation: </strong> { user.occupation || 'Unknown' }</p>
                        <p><strong>Age: </strong>{ user.city ? differenceInYears(
                            new Date(),
                            new Date(user.dob.toDate())
                        )  : 'Unknown age' }</p>
                        <p><strong>Lives In: </strong>{ user.city || 'Unknown City' }</p>

                    </Item.Description>
                </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
    )
}

export default UserProfileHeader
