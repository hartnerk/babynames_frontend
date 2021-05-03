import React from 'react'

// COMPONENTS
import TinderCard from 'react-tinder-card'
import Card from 'react-bootstrap/Card'

// STYLESHEET
import './SwiperPage.css'


const SwiperPage = () => {

  // hard coded names to see card effect in action
  const names = ['Caitlin', 'Jacob', 'James', 'Jon', 'Krysta', 'Kyle']

  // when a card is swiped the direction of the swipe is console.logged
  // placeholder for '(dis)liked' logic
  const onSwipe = (direction) => {
    console.log(`You swiped ${direction}`)
  }

  // maps through list of names and returns the swipe-able card in the form of a bootstrap card
  const renderNameDeck = names.map((name, index) => {
    return (
      <TinderCard
        key={index}
        // calls on swipe to console.log direction
        onSwipe={onSwipe}
        // prevent the default of being able to swipe in any direction
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
              {name}
            </Card.Title>
          </Card.Body>
        </Card>

      </TinderCard >
    )
  })


  return (
    <div className='deck'>
      {renderNameDeck}
    </div>
  )
}

export default SwiperPage
