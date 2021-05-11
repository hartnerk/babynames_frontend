import React, {useEffect} from 'react'


// COMPONENTS
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useState } from 'react'

// STYLES
import { AuthContainer } from '../../styles/styledComponents/PreferencesPage'

function RecomendedPage({name}) {
    const [names, setNames] = useState([])
    // const name = "Michael"
    useEffect(() => {
      handelRecomendations()
       
    }, [])

    async function handelRecomendations(e){
        try {
          const init = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
          }
          const response = await fetch(`http://localhost:8000/users/recomendations`, init)
          const data = await response.json()
          console.log('this is the recomendation: ', data)
          setNames(data)
        } catch (error) {
          alert(error)
        }
    }

    const renderRecomendations = names.map((name, index) => {
        return (
            <div>
              <h1> {name.baby_name} , </h1>
            </div>
        )
    })
    
    return(
        <AuthContainer>
            {renderRecomendations}
        </AuthContainer>
    )
}

export default RecomendedPage
