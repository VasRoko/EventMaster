import React, { Component } from 'react'
import { Label, Form } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete from 'react-places-autocomplete';
import { GoogleMapUrl } from '../../config/config';

const styles = {
    autocompleteContainer: {
        zIndex: 1000 
    }
} 

class PlaceInput extends Component {

  state = {
      scriptLoaded: false
  }

  handleScriptLoaded = () => this.setState({
      scriptLoaded: true
  })

  render() {
    const {input, width, onSelect, placeholder, options, meta: { touched, error}} = this.props;
    return (
        <Form.Field error={ touched && !!error } width={width}>
            <Script
                onLoad={this.handleScriptLoaded} 
                url= {GoogleMapUrl} 
            />
            { this.state.scriptLoaded && <PlacesAutocomplete 
                inputProps={{...input, placeholder}}
                options={options}
                onSelect={onSelect}
                styles={styles}
            /> }
            { touched && error && <Label basic color='red' pointing>{error}</Label>}
        </Form.Field >
    )
  }
}


export default PlaceInput;
