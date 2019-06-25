import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Card, Header, Image, Button } from 'semantic-ui-react'

const UserProfileAvatar = ({ user, userId }) => {
    return (
        <Card>
            <Image src={ user.photoURL || '/assets/img/user.png'} wrapped ui={false} />
            <Card.Content>
                <Header as="h3" style={{textAlign: 'center' }}>{ user.displayName || 'Unknown' }</Header>
            </Card.Content>
            <Card.Content extra>
                {
                    user.id === userId ? 
                    <Button as={ Link } to="#" icon="user" positive fluid content="Follow" /> :
                    <Button as={ Link } to="/settings/basic" icon="edit" positive fluid content="Edit Profile" />
                }
            </Card.Content>
            <Card.Content extra>
                <Icon name='user' />
                    10 Folowers
            </Card.Content>
        </Card>
    )
}

export default UserProfileAvatar;