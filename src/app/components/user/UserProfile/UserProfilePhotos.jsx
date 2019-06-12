import React from 'react'
import { Segment, Header, Image } from 'semantic-ui-react';


const UserProfilePhotos = ({ photos }) => {
    return (
        <Segment attached>
            <Header icon="image" content="Photos"/>
            <Image.Group size="small">
                { photos.map(photo =>
                    <Image key={photo.id} src={photo.url} />
                )}
            </Image.Group>
        </Segment>
    )
}

export default UserProfilePhotos
