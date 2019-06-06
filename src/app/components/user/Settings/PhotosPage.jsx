import React, { Component } from 'react';
import { Segment, Header, Grid, Divider, Card, Image, Button, Icon } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

class PhotosPage extends Component {
    
    render() {
        return (
            <Segment>
                <Header dividing size="large" content="Your Photos" />
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Header color="teal" sub content="Step 1 - Add Photo" />
                                <Dropzone  onDrop={files => console.log(files)}>
                                    {({getRootProps, getInputProps}) => (
                                        <div className="container">
                                        <div
                                            {...getRootProps({
                                                className: 'dropzone',
                                                onDrop: event => event.stopPropagation()
                                            })}
                                        >
                                            <input {...getInputProps()} />
                                            <Icon name="upload"  size="huge"/>
                                            <Header sub content="Drag 'n' drop some files here, or click to select files" />
                                        </div>
                                        </div>
                                    )}
                                </Dropzone>
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
};

export default PhotosPage;