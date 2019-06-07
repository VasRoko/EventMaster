import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Icon, Header } from 'semantic-ui-react';

const DropzoneInput = () => {
  const onDrop = useCallback(acceptedFiles => {
    
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
      onDrop,
      multiple: false,
      accept: 'image/jpeg, image/png'
    })

  return (
    <div {...getRootProps()} className={'dropzone '  + (isDragActive && 'dropzone--isActive') }>
      <input {...getInputProps()} />
        <Icon name="upload" size="huge" />
        <Header content="Drop image here"/>
    </div>
  )
}

export default DropzoneInput;