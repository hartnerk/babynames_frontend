import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

// COMPONENTS
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// STYLESHEETS
import { ListGroup } from 'react-bootstrap'

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

  const fetchNameObjs = async (coupleID) => {
    try {
      const response = await fetch(`http://localhost:8000/users/couples/${coupleID}/liked-names/`)
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

  // ** Hard coded couple ID assuming state/props is being passed from somewhere else in app
  useEffect(() => {
    fetchNameObjs(4)
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

  const saveNamesOrder = (coupleID) => {
    try {
      likedNames.map(async (name, index) => {
        const nameObj = {
          id: name.id,
          usercouple_id: coupleID,
          name_id: name.name_id,
          matched: name.matched,
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
        const saveRequest = await fetch (`http://localhost:8000/users/couples/${coupleID}/liked-names/${name.id}/`, init)
      })
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
        <h1>Your Liked Baby Names</h1>
        <Container>
          <Form onSubmit={onSubmitNewName}>
              <Form.Group>
                      <Form.Label htmlFor='newName'>Add your Name:</Form.Label> <br />
                      <Form.Control
                          name='newName'
                          type='text'
                          value={newName}
                          required
                          onChange={e => setnewName(e.target.value)}
                      />
                      <Form.Label htmlFor='gender'>Add your gender:</Form.Label> <br />
                      <Form.Control
                          name='gender'
                          type='text'
                          value={gender}
                          required
                          onChange={e => setnewGender(e.target.value)}
                      />
              </Form.Group>
              <Button variant='primary' type='submit' >Add Name</Button>
          </Form>
        </Container>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='names'>
            {(provided) => (
            <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                {likedNames.map((name, index) => {
                  return (
                    <Draggable key={index} index={index} draggableId={index.toString()}>
                      {(provided) => (
                        <ListGroup.Item 
                          {...provided.draggableProps} 
                          {...provided.dragHandleProps} 
                          ref={provided.innerRef}
                        >
                          {index+1}: {name.baby_name}
                        </ListGroup.Item>
                      )
                      }
                    </Draggable>
                  ) 
                })}
              {provided.placeholder}
            </ListGroup>
            )}
          </Droppable>
        </DragDropContext>
        {/* ** hard coded couple ID here ** */}
        <Button variant='primary' onClick={() => saveNamesOrder(4)}>Save Order</Button>
      </div>
    )
  }
}

export default LikedNamesPage
