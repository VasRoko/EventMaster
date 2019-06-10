import React, { Fragment } from 'react';
import { Header, Divider, Card, Image, Button} from 'semantic-ui-react';

const PhotosCollection = ({ photos, profile }) => {
    return (
        <Fragment>
            <Header sub color="teal" content="All Photos" />
            <Divider /> 
            <Card.Group itemsPerRow={5}>
                <Card>
                    <Image src={profile.photoURL } />
                    <Button positive>Main Photo</Button>
                </Card>
                { photos && photos.filter(photo => {
                    return photo.url !== profile.photoURL
                }).map(photo => 
                    <Card key={photo.id}>
                        <Image src={photo.url} />
                        <div className="ui two buttons"> 
                            <Button basic color="green">Main </Button>
                            <Button basic color="red" icon="trash" />
                        </div>
                    </Card>
                )}
            </Card.Group>
        </Fragment>
    )
}

export default PhotosCollection;