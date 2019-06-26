import React from 'react'
import { differenceInYears } from 'date-fns';
import { Segment, Item, Grid, Icon } from 'semantic-ui-react';
import { format } from 'date-fns';

const UserProfileHeader = ({ user }) => {
    return (
        <Segment>
            <Item>
                <Item.Content>
                    <Item.Description>
                        <Grid columns='two' divided>
                            <Grid.Column>
                                <p><strong>Age: </strong>{ user.city ? differenceInYears(
                                    new Date(),
                                    new Date(user.dob.toDate())
                                )  : 'Unknown' }</p>
                                <p><strong>Gender: </strong> { user.gender ? <Icon.Group><Icon name={user.gender} /> {user.gender} </Icon.Group> : 'Unknown' }</p>
                                <p><strong>Occupation: </strong> { user.occupation || 'Unknown' }</p>
                                <p><strong>Lives In: </strong>{ user.city || 'Unknown' }</p>
                            </Grid.Column>
                            <Grid.Column>
                                <p><strong>Originally from: </strong>{ user.origin || 'Unknown' }</p>
                                <p><strong>Member Since: </strong> { user.createdAt ? format(user.createdAt.toDate().toString(), 'MMM YYYY') : 'Unknown' } </p>
                                <p><strong>Description: </strong>{ user.about || 'No description'  }</p>
                            </Grid.Column>
                        </Grid>
                    </Item.Description>
                </Item.Content>
            </Item>
        </Segment>
    )
}

export default UserProfileHeader
