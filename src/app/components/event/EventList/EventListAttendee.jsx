import React, { Component } from 'react'
import { List, Image } from 'semantic-ui-react'

class EventListAttendee extends Component {
  render() {
    return (
      <List.Item>
          <Image circular as='a' size='mini' src='https://randomuser.me/api/portraits/men/22.jpg' />
      </List.Item> 
    )
  }
}

export default EventListAttendee;