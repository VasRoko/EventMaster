import React from 'react'
import { Segment, Header, Image, Divider } from 'semantic-ui-react';

const UserProfilePhotos = ({ photos }) => {
    return (
        <Segment>
            <Header icon="image" content="Photos"/>
            <Divider />
            <Image.Group size="small">
                { photos.map(photo =>
                    <Image key={photo.id} src={photo.url} />
                )}
            </Image.Group>
        </Segment>
    )
}

export default UserProfilePhotos
