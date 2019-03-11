import React from 'react';
import { Segment, Icon }  from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

const Marker = () => <Icon name='marker' size='big' color='blue' />

const EventDetailedMap = ({lat, lng}) => {
    const center = [lat, lng];
    const zoom = 15;
    return (
        <Segment attached='bottom'  style={{ padding: 0 }} >
            <div style={{ height: '350px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyCj3910ZM5ZSZz78mGcPxWjxxRfMz14SGA" }}
                    defaultCenter={center}
                    defaultZoom={zoom} >
                <Marker lat={lat} lng={lng} />
                </GoogleMapReact>
            </div>
        </Segment>
    )
}

export default EventDetailedMap