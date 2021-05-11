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

  const saveLikedName = async (nameID, coupleID, userID) => {
    try {
      const newLikedName1 = {  //POST TO USER COUPLE LIKED NAMES
        usercouple_id: coupleID,
        name_id: nameID,
        order: nameID
      }
      // Check if name is already on list
      const checkRequest = await fetch(`http://localhost:8000/users/couples/${coupleID}/liked-names/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      let checkResponse = await checkRequest.json()
      for (let i = 0; i < checkResponse.length; i++) {
        if (checkResponse[i]['name_id'] === newLikedName1['name_id']) {
          newLikedName1['matched'] = true;
        }
      }

      const request1 = await fetch(`http://localhost:8000/users/couples/${coupleID}/liked-names/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(newLikedName1)
      })
      const response1 = await request1.json()

      const newLikedName2 = { // POST TO USER LIKED NAMES
        user_id: userID,
        name_id: nameID,
        order: nameID
      }
      const request2 = await fetch(`http://localhost:8000/users/user_info/${userID}/user-likes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(newLikedName2)
      })
      const response2 = await request2.json()
      console.log('POST to user liked names: ', response2)
      window.location.reload()
      return response1
    } catch (error) {
      alert(error)
    }
  }





  const renderRecommendations = names.map((name, index) => {
    if (names.length > 1) {
      return (
        <NameListItem className='fifth'>
          <div />
          {name.baby_name}
          <Info
            className='add'
            onClick={() => saveLikedName(name.id, localStorage.getItem('couple_id'), localStorage.getItem('user_id'))}
          >
            +
          </Info>
        </NameListItem>
      )
    } else {
      return (
        <p
          style={{color: '#E57778', fontSize: '24px', margin: '10px 100px'}}
        >
          We don't have enough data to make recommendations at this time.  Please keep swiping names and check back later.</p>
      )
    }
  })

  return (
    <div>
      <PageTitle className='likes'>Your Recommendations</PageTitle>
      <p style={{ fontStyle: 'italic', color: '#C96984' }}>Based on your liked baby names.</p>
      <LikedNamesContainer>
        {renderRecommendations}
      </LikedNamesContainer>
    </div >
  )
}

export default RecomendedPage
