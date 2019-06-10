import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Grid, Divider, Card, Image, Button } from 'semantic-ui-react';
import { uploadAvatar } from '../../../actions/userActions';
import DropzoneInput from './dropzone/DropzoneInput';
import CropperInput from './cropper/cropperInput';
import { successNotification, errorNotification } from '../../../common/notifications/notification';
import LoadingComponent from '../../../components/loading/LoadingComponent';

const actions = {
    uploadAvatar: uploadAvatar
}

const mapState = (state) => ({
    loading: state.async.loading
});

const PhotosPage = ({ uploadAvatar, loading }) => {
    const [ files, setFiles] = useState([]);
    const [ image, setImage] = useState(null);

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        }
    }, [files]);

    const handleAvatarUpload = async () => {
        try {
            console.log(image, files[0].name)
            await uploadAvatar(image, files[0].name);
            successNotification('Success!', 'New photo has been uploaded.');
        } catch (e) {
            errorNotification();
            throw new Error({
                _error: e.message
            })
        }
    }

    const handleCancelCrop = () => {
        setFiles([]);
        setImage(null);
    }

    return (
        <Fragment>
            <Segment>
            <Header dividing size="large" content="Your Photos" />
                {loading && <LoadingComponent content="Uploading... Please wait." /> }
                <Grid>
                    <Grid.Row  style={{ textAlign: 'center' }}>
                        <Grid.Column width={4}>
                            <Header color="teal" sub content="Step 1 - Add Photo"  style={{ margin: '10px' }}/>
                            <DropzoneInput setFiles={setFiles}/>
                        </Grid.Column>
                        <Grid.Column width={1} />
                        <Grid.Column width={4}>
                            <Header color="teal" sub content="Step 2 - Resize Image" style={{ margin: '10px' }} />
                            { files.length > 0 && 
                                <CropperInput setImage={setImage} imagePreview={files[0].preview}  />                            
                            }
                        </Grid.Column>
                        <Grid.Column width={1} />
                        <Grid.Column width={4} className="img-test">
                            <Header color="teal" sub content="Step 3 - Preview and Upload" style={{ margin: '10px' }} />
                            { files.length > 0 && (
                            <Fragment>
                                    <div className="img-preview" style={{ minHeight: '200px', minWidth: '200px', overflow: 'hidden' }} />
                                    <Button.Group>
                                        <Button onClick={handleAvatarUpload} style={{ width: '100px'}} positive icon="check"/>
                                        <Button onClick={handleCancelCrop} style={{ width: '100px'}} negative icon="close"/>
                                    </Button.Group>
                            </Fragment> )}
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
        </Fragment>
    )
}

export default connect(mapState, actions)(PhotosPage);