import React, { Component } from 'react'
import { connect } from 'react-redux'

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const incrementAsync = () => {
  return async dispatch => {
    await delay(1000);
    
  }
}

class TestComponent extends Component {
    render() {
    return (
      <div>

      </div>
    );
  }
}

export default connect()(TestComponent);
