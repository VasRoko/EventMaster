import React from 'react';
import { format } from 'date-fns';
import { Segment, Header, List, Grid, Divider,Item, Icon } from 'semantic-ui-react';

const UserProfileAbout = ({ user }) => {
    return (
        <Segment attached>
        <Grid columns={2}>
            <Grid.Column width={10}>
                <Header icon="user circle" content={`About ${user.displayName}`} />
                <Divider />
                <p>I am a: <strong> { user.gender ? <Icon.Group><Icon name={user.gender} /> {user.gender} </Icon.Group> : 'Unknown' } </strong></p>
                <p>Originally from: <strong>{ user.origin || 'Unknown' }</strong></p>
                <p>Member Since: <strong> { user.createdAt ? format(user.createdAt.toDate().toString(), 'MMM YYYY') : 'Unknown' } </strong></p>
                <p>Description: <strong>{ user.about &&  user.about }</strong></p>
            </Grid.Column>
            <Grid.Column width={6}>
                <Header icon="info circle" content="Interests" />
                <Divider />
                <List>
                    {
                        user.interests ? user.interests.map((val, index ) => 
                            <Item key={index}>
                                <Icon name="caret right" />
                                <Item.Content>{val.toUpperCase()}</Item.Content>
                                <Divider />
                            </Item>                                        
                        ) : "No interests"
                    }
                </List>
            </Grid.Column>
        </Grid>
    </Segment>
    )
}

export default UserProfileAbout
