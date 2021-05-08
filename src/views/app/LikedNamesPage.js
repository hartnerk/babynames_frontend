import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

// COMPONENTS
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// STYLESHEETS
import { ListGroup , ButtonGroup } from 'react-bootstrap'
  import {AddNameFormContainer, AddNameTitle, AddNameForm, AddNameField} from '../../styles/styledComponents/AddNameForm'

const LikedNamesPage = () => {
  const [loading, setLoading] = useState(true)
  const [likedNames, setLikedNames] = useState([])
  const [newName, setnewName] = useState('')
  const [gender, setnewGender] = useState('')

  const fetchNameFromID = async (nameID) => {
    try {
      const response = await fetch(`http://localhost:8000/users/baby-names/${nameID}/`)
      const data = await response.json()
      return data
    } catch (error) {
      alert(error)
    }
  }

  const fetchNameObjs = async (userID) => {
    try {
      const response = await fetch(`http://localhost:8000/users/user_info/${userID}/user-likes/`)
      const data = await response.json()
      await Promise.all( data.map(async(name) => {
        const baby_name = await(fetchNameFromID(name.name_id))
        name['baby_name'] = baby_name.baby_name
        
      }))
      data.sort((a, b) => (a.order > b.order) ? 1 : -1)
      setLikedNames(data)
      setLoading(false)
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    fetchNameObjs(localStorage.getItem('user_id'))
  }, [])


  const handleOnDragEnd = (result) => {
    if(!result.destination) return
    const items = Array.from(likedNames)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setLikedNames(items)
  }

  async function onSubmitNewName(e) {
    e.preventDefault()
    let init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('access_token'),
      }, 
      body:  JSON.stringify({customName: newName, gender: gender})
    }
    try {
      const response = await fetch(`http://localhost:8000/users/add_name/`, init)
      const data = await response.json()
      return data
    } catch (error) {
      alert(error)
    }
  }

  const saveNamesOrder = (userID) => {
    try {
      likedNames.map(async (name, index) => {
        const nameObj = {
          id: name.id,
          user_id: userID,
          name_id: name.name_id,
          order: index
        }
        const init = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          body: JSON.stringify(nameObj)
        }
        const saveRequest = await fetch(`http://localhost:8000/users/user_info/${userID}/user-likes/${name.id}/`, init)
      })
    } catch (error) {
      console.log(error)
    }
    setMatchOrder()
  }

  async function setMatchOrder() {
    let init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('access_token'),
      }, 
      body:  JSON.stringify({})
    }
    try {
      const response = await fetch(`http://localhost:8000/users/match_order/`, init)
      const data = await response.json()
      console.log(data)
    }
    catch(error) {
      console.log(error)
    }
  }

  async function deleteName(e) {
    e.preventDefault()
    console.log('her hre', e)
    try {
        const init = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          body: JSON.stringify({customName: e.target.value})
        }
        const saveRequest = await fetch (`http://localhost:8000/users/deletelikedname/`, init)
      } catch (error) {
        console.log(error)
      }
  }



  if(loading) {
    return (
      <h1>loading</h1>
    )
  } else if(likedNames.length < 1) {
    return (
      <h1>You don't have any liked names yet.</h1>
    )
  } else {
    return(
      <div>
        <AddNameFormContainer>
          <AddNameForm>
            <AddNameTitle>add a new name</AddNameTitle>
            <AddNameField placeholder='new name'></AddNameField>
          </AddNameForm>
        </AddNameFormContainer>
      </div>
    )
  }
}

export default LikedNamesPage
