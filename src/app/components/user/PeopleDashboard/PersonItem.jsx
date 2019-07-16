import React from 'react'
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Grid, Button } from 'semantic-ui-react'

const PersonItem = ({ user }) => {
    return (
        <Card as={Link} to="/" >
            <Image size="tiny" src='https://randomuser.me/api/portraits/men/15.jpg' wrapped ui={false} />
            <Card.Content>
            <Card.Header>Matthew</Card.Header>
            <Card.Meta>
                <span className='date'>Joined in 2015</span>
            </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Grid>
                    <Grid.Column width={8} style={{ padding: '20px 15px' }}>
                        <Icon name='user' />
                        22 Followers
                    </Grid.Column>
                    <Grid.Column width={8} style={{ padding: '15px 25px' }}>
                        <Button size='tiny' color='teal'>Follow</Button>
                    </Grid.Column>
                </Grid>
            </Card.Content>
        </Card>
    )
}

export default PersonItem