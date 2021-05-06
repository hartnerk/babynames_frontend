import React from 'react'

// COMPONENTS
import Alert from 'react-bootstrap/Alert'

function MatchAlert({matched}) {

  return (
    matched && <Alert variant="primary">Its a match!</Alert>
  )
}

export default MatchAlert
