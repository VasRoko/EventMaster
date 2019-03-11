import React, { Component } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { Button, Icon } from 'semantic-ui-react';
import Script from 'react-load-script';
import GoogleMapReact from 'google-map-react';


const Marker = () => <Icon name='marker' size='big' color='blue' />

class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  state = { address: '',  scriptLoaded: false}

  scriptLoaded = () => {
    this.setState({
      scriptLoaded: true
    })
  }

  onChange = (address) => this.setState({ address })

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }
     
    return (
      <div>
        {/* <Script 
          url='https://maps.googleapis.com/maps/api/js?key=AIzaSyCj3910ZM5ZSZz78mGcPxWjxxRfMz14SGA&libraries=places' 
          onLoad={this.scriptLoaded}
        /> */}
        {this.state.scriptLoaded && 
        <form onSubmit={this.handleFormSubmit}>
          <PlacesAutocomplete inputProps={inputProps} />
          <button type="submit">Submit</button>
        </form>}
        <div style={{ height: '350px', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyCj3910ZM5ZSZz78mGcPxWjxxRfMz14SGA" }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <Marker
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default TestComponent
