import React, { useState, useEffect } from 'react'

// COMPONENTS
import TinderCard from 'react-tinder-card'
import Card from 'react-bootstrap/Card'
import MatchAlert from '../../../components/MatchAlert'

// STYLESHEET
import './SwiperPage.css'
import { CardsContainer, SwiperCard } from '../../../styles/styledComponents/SwiperCard'

const SwiperPage = (props) => {
  const [names, setNames] = useState([])
  const [loading, setLoading] = useState(true)
  const [Matched, setMatched] = useState(false)

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }


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
      let names_array = shuffle(data[0].names.slice(0, 101 - localStorage.getItem('name_index')))
      setNames(names_array)
      setLoading(false)
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    getNames(localStorage.getItem('couple_id'))
  }, []);

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
      for (let i=0; i < checkResponse.length; i++) {
        if (checkResponse[i]['name_id'] === newLikedName1['name_id']) {
          setMatched(true)
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

      if (response1.matched === true) {
        setMatched(true)
      } else {
        setMatched(false)
      }
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

      return response1
    } catch (error) {
      alert(error)
    }
  }

  const saveDislikedName = async (nameID, coupleID, userID) => {
      const newLikedName2 = { // POST TO USER DISLIKED NAMES
        user_id: userID,
        name_id: nameID
      }
      const request2 = await fetch(`http://localhost:8000/users/user_info/${userID}/user-dislikes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(newLikedName2)
      })
      const response2 = await request2.json()
      console.log('POST to user disliked names: ', response2)
  }


  const swiped = (direction, name) => {
    if (direction === 'left') {
      console.log(`You disliked ${name.baby_name}`)
      setMatched(false)
      saveDislikedName(name.id, localStorage.getItem('couple_id'), localStorage.getItem('user_id'))
    } else if (direction === 'right') {
      console.log(`You liked ${name.baby_name}`)
      saveLikedName(name.id, localStorage.getItem('couple_id'), localStorage.getItem('user_id'))
    }
    localStorage.setItem('name_index', parseInt(localStorage.getItem('name_index')) + 1)
  };

  const randomColor = () => {
    const colors = [
      '#AD588C',
      '#C96984',
      '#E57778',
      '#ED917A',
      '#F1B581',
      '#ECCF8B',
    ]
    const color = colors[Math.floor(Math.random() * colors.length)];
    return color;
  }

  const randomRotate = () => {
    const rotation = Math.ceil(Math.random() * 6) * (Math.round(Math.random()) ? 1 : -1)
    return `rotate(${rotation}deg)`;
  }

  const cardStyles = () => {
    const style = {
      backgroundColor: randomColor(),
      transform: randomRotate()
    }
    return style
  }

  console.log(cardStyles)
  const renderNameDeck = names.map((name, index) => {
    if (loading === false) {
      return (
        <TinderCard
          key={index}
          onSwipe={(direction) => swiped(direction, name)}
          preventSwipe={['up', 'down']}
          className='swipe'
        >
          <SwiperCard
            style={cardStyles()}
          >
            {name.baby_name}
          </SwiperCard>
        </TinderCard >
      );
    };
  });


  return (
    <CardsContainer>
      {renderNameDeck}
      <MatchAlert matched={Matched}></MatchAlert>
    </CardsContainer>
  );
};

export default SwiperPage
