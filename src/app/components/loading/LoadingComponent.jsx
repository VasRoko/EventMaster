import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingComponent = () => {
  return (
    <Dimmer active={true}>
        <Loader content="Loading..." />
    </Dimmer>
  )
}

export default LoadingComponent
