import React from 'react'

// COMPONENTS
import Alert from 'react-bootstrap/Alert'

function MatchAlert({ matched }) {

  return (
    matched && <Alert style={{ backgroundColor: '#FFF6E2', color: '#AD588C' }}>Its a match!</Alert>
  )
}

export default MatchAlert
