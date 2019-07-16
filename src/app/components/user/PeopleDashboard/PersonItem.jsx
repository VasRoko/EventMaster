import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import format from 'date-fns/format';

const PersonItem = ({ user }) => {

    return (
        <Card>
            <Image size="tiny" src={user.photoURL || 'assets/img/user.png' } wrapped ui={false} />
            <Card.Content>
                <Card.Header>{user.displayName}</Card.Header>
            </Card.Content>
            <Card.Content extra>
                <span className='date'>Joined in { user.createdAt && format(user.createdAt.toDate(), 'MMMM YYYY')} </span>
            </Card.Content>
        </Card>
    )
}

export default PersonItem