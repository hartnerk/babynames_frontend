import React, { useState, useEffect } from 'react'

// COMPONENTS
import TinderCard from 'react-tinder-card'
import Card from 'react-bootstrap/Card'

// STYLESHEET
import './SwiperPage.css'


const SwiperPage = () => {
  const [names, setNames] = useState([])
  const [loading, setLoading] = useState(true)

  const getNames = async () => {
    try {
      // ** Hard coded in couple id assuming state/props for user and couple will be passed in from context, or a parent component/route
      const response = await fetch(`http://localhost:8000/users/name-pools/1`)
      const data = await response.json()
      setNames(data.names)
      setLoading(false)

    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    getNames()
  }, []);


  const saveLikedName = async (nameID) => {
    try {
      const newLikedName = {
        // ** Also hardcoded user id here!
        usercouple_id: 1,
        name_id: nameID
      }
      const request = fetch(`http://localhost:8000/users/liked-names/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newLikedName)
      })
      return request
    } catch (error) {
      alert(error)
    }
  }


  const swiped = (direction, name) => {
    if (direction === 'left') {
      console.log(`You disliked ${name.baby_name}`)
    } else if (direction === 'right') {
      console.log(`You liked ${name.baby_name}`)
      saveLikedName(name.id)
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
    </div>
  );
};

export default SwiperPage
