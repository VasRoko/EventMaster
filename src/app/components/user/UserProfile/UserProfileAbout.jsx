import React from 'react';
import { format } from 'date-fns';
import { Segment, Header, List, Label, Divider,Item, Icon } from 'semantic-ui-react';

const UserProfileAbout = ({ user }) => {
    return (
        <Segment>
            <Header icon="info circle" content="Interests" />
            <Divider />
            <List divided selection>
                {
                    user.interests ? user.interests.map((val, index ) => 
                        <List.Item key={index} as='a'>
                            <Label color='blue' horizontal>
                                {val.toUpperCase()}
                            </Label>
                        </List.Item>
                    ) : "No interests"
                }
            </List>
        </Segment>
    )
}

export default UserProfileAbout
