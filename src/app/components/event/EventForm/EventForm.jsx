import React, { Component } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createEvent, updateEvent } from '../../../actions/eventActions';
import cuid from 'cuid';


const mapState = (state, ownProps) => {
    const eventId = ownProps.match.params.id;

    let event = {
        title: '',
        date: '',
        city: '',
        venue: '',
        hostedBy: ''
    }

    if (eventId && state.events.length > 0) {
        event = state.events.find(event => event.id === eventId);
    } 

    return {
        event
    }

}

const actions = {
    createEvent,
    updateEvent
}

class EventForm extends Component {

    state = {
        event: Object.assign({}, this.props.event)
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        if(this.state.event.id){
            this.props.updateEvent(this.state.event);
            this.props.history.goBack();
        } else {
            const newEvent = {
                ...this.state.event,
                id: cuid(),
                hostPhotoURL: '/assets/img/user.png'
            } 
            this.props.createEvent(this.state.event);
            this.props.history.push('/events');
        }
    }

    onInputChange = (e) => {
        const newEvent = this.state.event;
        newEvent[e.target.name] = e.target.value
        this.setState({
            event: newEvent
        })
    }

  render() {
    const {handleCancel} = this.props;
    const {event} = this.state;
    return (
      <Segment>
            <Form onSubmit={this.onFormSubmit}>
                <Form.Field>
                    <label>Event Title</label>
                    <input 
                        name="title"
                        onChange={this.onInputChange} 
                        value={event.title} 
                        placeholder="First Name" />
                </Form.Field>
                <Form.Field>
                    <label>Event Date</label>
                    <input 
                        type="date" 
                        name="date"
                        onChange={this.onInputChange} 
                        value={event.date}
                        placeholder="Event Date" />
                </Form.Field>
                <Form.Field>
                    <label>City</label>
                    <input 
                        name="city"
                        onChange={this.onInputChange}
                        value={event.city}
                        placeholder="City event is taking place" />
                </Form.Field>
                <Form.Field>
                    <label>Venue</label>
                    <input 
                        name="venue"
                        onChange={this.onInputChange}
                        value={event.venue}
                        placeholder="Enter the Venue of the event" />
                </Form.Field>
                <Form.Field>
                    <label>Hosted By</label>
                    <input
                        name="hostedBy"
                        onChange={this.onInputChange} 
                        value={event.hostedBy}
                        placeholder="Enter the name of person hosting" />
                </Form.Field>
                <Button positive type="submit">Submit</Button>
                <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
          </Form>
      </Segment>
    )
  }
}

export default connect(mapState, actions)(EventForm);