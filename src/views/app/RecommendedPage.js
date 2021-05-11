import React, { useEffect } from 'react'


// COMPONENTS
import { useState } from 'react'

// STYLES
import { AuthContainer } from '../../styles/styledComponents/PreferencesPage'
import { PageTitle } from '../../styles/styledComponents/PageTitle'
import { LikedNamesContainer, NameListItem, Info } from '../../styles/styledComponents/NameLists'


function RecomendedPage({ name }) {
  const [names, setNames] = useState([])
  // const name = "Michael"
  useEffect(() => {
    handelRecomendations()

  }, [])

  async function handelRecomendations(e) {
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
      setNames(data)
    } catch (error) {
      alert(error)
    }
  }

  const renderRecommendations = names.map((name, index) => {
    return (
      <NameListItem className='fifth'>
        <div />
        {name.baby_name}
        <Info className='add'>
          +
        </Info>
      </NameListItem>
    )
  })

  return (
    <div>
      <PageTitle>Your Recommendations</PageTitle>
      <p style={{ fontStyle: 'italic', color: '#C96984' }}>Based on your liked baby names.</p>
      <LikedNamesContainer>

        {renderRecommendations}
      </LikedNamesContainer>
    </div >
  )
}

export default RecomendedPage
