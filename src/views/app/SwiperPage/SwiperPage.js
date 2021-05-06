import React, { useState, useEffect } from 'react'

// COMPONENTS
import TinderCard from 'react-tinder-card'
import Card from 'react-bootstrap/Card'
import MatchAlert from '../../../components/MatchAlert'

// STYLESHEET
import './SwiperPage.css'

const SwiperPage = () => {
  const [names, setNames] = useState([])
  const [loading, setLoading] = useState(true)
  const [Matched, setMatched] = useState(false)

  const getNames = async (coupleID) => {
    try {
      const init = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const response = await fetch(`http://localhost:8000/users/couples/${coupleID}/name-pools/`, init)
      const data = await response.json()
      setNames(data[0].names)
      setLoading(false)

    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    // ** Hard coded in couple id assuming state/props for user and couple will be passed in from context, or a parent component/route
    getNames(3)
  }, []);

  const saveLikedName = async (nameID, coupleID) => {
    try {
      const newLikedName = {
        usercouple_id: coupleID,
        name_id: nameID
      }
      const request = await fetch(`http://localhost:8000/users/couples/${coupleID}/liked-names/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(newLikedName)
      })
      const response = await request.json()
      if (response.matched == true) {
        setMatched(true)
      } else {
        setMatched(false)
      }
      return response
    } catch (error) {
      alert(error)
    }
  }


  const swiped = (direction, name) => {
    if (direction === 'left') {
      console.log(`You disliked ${name.baby_name}`)
      setMatched(false)
    } else if (direction === 'right') {
      console.log(`You liked ${name.baby_name}`)
      // ** Also hardcoded user id here!
      saveLikedName(name.id, 3)
    }
  };

  const renderNameDeck = names.map((name, index) => {
    if (loading === false) {
      return (
        <TinderCard
          key={index}
          onSwipe={(direction) => swiped(direction, name)}
          preventSwipe={['up', 'down']}
          className='swipe'
        >
          <Card
            bg='info'
            className='card'
            style={{
              position: 'relative'
            }}
          >
            <Card.Body className='card-body'>
              <Card.Title className='name'>
                {name.baby_name}
              </Card.Title>
            </Card.Body>
          </Card>
        </TinderCard >
      );
    };
  });


  return (
    <div className='deck'>
      {renderNameDeck}
      <MatchAlert matched={Matched}></MatchAlert>
    </div>
  );
};

export default SwiperPage
