import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingComponent = ({ content = "Loading..." }) => {
  return (
    <Dimmer active={true} inverted>
        <Loader content={content} />
    </Dimmer>
  )
}

export default LoadingComponent
