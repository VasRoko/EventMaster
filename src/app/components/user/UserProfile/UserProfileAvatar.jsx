import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Card, Header, Image, Button } from 'semantic-ui-react'

const UserProfileAvatar = ({ user, userId, followUser, isFollowing, unfollowUser, followers, following}) => {
    return (
        <Card>
            <Image src={ user.photoURL || '/assets/img/user.png'} wrapped ui={false} />
            <Card.Content>
                <Header as="h3" style={{textAlign: 'center' }}>{ user.displayName || 'Unknown' }</Header>
            </Card.Content>
            <Card.Content extra>
                {
                    user.id === userId ? 
                        isFollowing.length > 0 ? <Button onClick={() => unfollowUser(userId, isFollowing[0].id, following[0].id)} icon="user" positive fluid content="Unfollow" /> 
                                    : <Button onClick={() => followUser(userId)} icon="user" color="green" basic fluid content="Follow" /> 
                    : <Button as={ Link } to="/settings/basic" icon="edit" positive fluid content="Edit Profile" />
                }
            </Card.Content>
            <Card.Content extra>
                <Icon name='user' />
                    { 
                        followers.length <= 1
                        ? <span>{followers.length} Follower</span>
                        : <span>{followers.length} Followers</span>
                    } 
            </Card.Content>
        </Card>
    )
}

export default UserProfileAvatar;