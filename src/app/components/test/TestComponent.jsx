import React, { Component } from 'react'
import { openModal } from '../../actions/modalActions'
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux'

const actions = {
  openModal
}

class TestComponent extends Component {
    render() {
    const { openModal } = this.props
    return (
      <div>
        <Button onClick={() => openModal('TestModal', {data: 23})} color="teal" content="Open Modal" />
      </div>
    );
  }
}

export default connect(null, actions)(TestComponent);
