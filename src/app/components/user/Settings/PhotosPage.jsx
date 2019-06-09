import React, { useState } from 'react';
import { Segment, Header, Grid, Divider, Card, Image, Button } from 'semantic-ui-react';
import DropzoneInput from './dropzone/DropzoneInput';

const PhotosPage = () => {
    const [files, setFiles] = useState([]);
    return (
        <Segment>
            <Header dividing size="large" content="Your Photos" />
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Header color="teal" sub content="Step 1 - Add Photo" />
                            <DropzoneInput setFiles={setFiles}/>
                        </Grid.Column>
                        <Grid.Column width={1} />
                        <Grid.Column width={4}>
                            <Header color="teal" sub content="Step 2 - Resize Image" />
                        </Grid.Column>
                        <Grid.Column width={1} />
                        <Grid.Column width={4}>
                            <Header color="teal" sub content="Step 3 - Preview and Upload" />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider />
                <Header sub color="teal" content="All Photos" />
                <Divider />
                <Card.Group itemsPerRow={5}>
                    <Card>
                        <Image src="https://randomuser.me/api/portraits/men/20.jpg" />
                        <Button positive>Main Photo</Button>
                    </Card>
                    <Card>
                        <Image src="https://randomuser.me/api/portraits/men/20.jpg" />
                        <div className="ui two buttons"> 
                            <Button basic color="green">Main </Button>
                            <Button basic color="red" icon="trash" />
                        </div>
                    </Card>
                </Card.Group>
        </Segment>
    )
}

export default PhotosPage;