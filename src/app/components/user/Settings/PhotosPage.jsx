import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Segment, Header, Grid, Divider, Button } from 'semantic-ui-react';
import { uploadAvatar, deletePhoto, setMainPhoto } from '../../../actions/userActions';
import DropzoneInput from './dropzone/DropzoneInput';
import CropperInput from './cropper/cropperInput';
import { successNotification, errorNotification } from '../../../common/notifications/notification';
import LoadingComponent from '../../../components/loading/LoadingComponent';
import PhotosCollection from './PhotosCollection';

const actions = {
    uploadAvatar: uploadAvatar,
    setMainPhoto: setMainPhoto,
    deletePhoto: deletePhoto
}

const mapState = (state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    loading: state.async.loading,
    photos: state.firestore.ordered.photos
});

const queryFirebase = ({ auth }) => {
    return [
        { 
            collection: 'users',
            doc: auth.uid,
            subcollections: [{ collection: 'photos' }],
            storeAs: 'photos'
        }
    ]
} 

const PhotosPage = ({ uploadAvatar, loading, photos, profile, deletePhoto, setMainPhoto }) => {
    const [ files, setFiles] = useState([]);
    const [ image, setImage] = useState(null);

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        }
    }, [files]);

    const handleAvatarUpload = async () => {
        try {
            await uploadAvatar(image, files[0].name);
            successNotification('Success!', 'New photo has been uploaded.');
            handleCancelCrop();
        } catch (e) {
            errorNotification();
        }
    }

    const handleCancelCrop = () => {
        setFiles([]);
        setImage(null);
    }

    const handleDeletePhoto = async (photo) => {
        try {
            await deletePhoto(photo)
        } catch (e) {
            errorNotification();
        }
    }

    const handleSetMainPhoto = async (photo) => {
        try {
            await setMainPhoto(photo);
            successNotification('Success!', 'New main photo has been changed!');
        } catch (e) {
            console.log(e.message);
            errorNotification();
        }
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
                <PhotosCollection photos={photos} profile={profile} handleSetMainPhoto={handleSetMainPhoto} handleDeletePhoto={handleDeletePhoto} />
            </Segment>
        </Fragment>
    )
}

export default compose(
    connect(mapState, actions),
    firestoreConnect(auth => queryFirebase(auth))
)(PhotosPage);