import React, { Fragment } from 'react';
import { Header, Divider, Card, Image, Button} from 'semantic-ui-react';

const PhotosCollection = ({ photos, profile, handleDeletePhoto, handleSetMainPhoto, loading }) => {
    return (
        <Fragment>
            <Header sub color="teal" content="All Photos" />
            <Divider /> 
            <Card.Group itemsPerRow={5}>
                <Card>
                    <Image src={profile.photoURL || '/assets/img/user.png' } />
                    <Button positive>Main Photo</Button>
                </Card>
                { photos && photos.filter(photo => {
                    return photo.url !== profile.photoURL
                }).map(photo => 
                    <Card key={photo.id}>
                        <Image src={photo.url} />
                        <Button.Group floated='left'>
                            <Button loading={loading} onClick={() => handleSetMainPhoto(photo)} inverted color='green' >Main </Button>
                            <Button onClick={() => handleDeletePhoto(photo)} inverted color='red' icon="trash" />
                        </Button.Group>
                    </Card>
                )}
            </Card.Group>
        </Fragment>
    )
}

export default PhotosCollection;