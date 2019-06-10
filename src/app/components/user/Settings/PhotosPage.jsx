import React, { useState, useEffect } from 'react';
import { Segment, Header, Grid, Divider, Card, Image, Button } from 'semantic-ui-react';
import DropzoneInput from './dropzone/DropzoneInput';
import CropperInput from './cropper/cropperInput';

const PhotosPage = () => {
    const [ files, setFiles] = useState([]);
    const [ image, setImage] = useState(null);

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        }
    }, [files]);

    return (
        <Segment>
            <Header dividing size="large" content="Your Photos" />
                <Grid>
                    <Grid.Row  style={{ textAlign: 'center' }}>
                        <Grid.Column width={4}>
                            <Header color="teal" sub content="Step 1 - Add Photo" />
                            <DropzoneInput setFiles={setFiles}/>
                        </Grid.Column>
                        <Grid.Column width={1} />
                        <Grid.Column width={4}>
                            <Header color="teal" sub content="Step 2 - Resize Image" />
                            { files.length > 0 && 
                                <CropperInput setImage={setImage} imagePreview={files[0].preview}  />                            
                            }
                        </Grid.Column>
                        <Grid.Column width={1} />
                        <Grid.Column width={4} className="img-test">
                            <Header color="teal" sub content="Step 3 - Preview and Upload" />
                            { files.length > 0 && (<div className="img-preview" style={{ minHeight: '200px', minWidth: '200px', overflow: 'hidden' }} /> )}
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