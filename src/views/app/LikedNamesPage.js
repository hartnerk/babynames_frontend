import React, { useState, useEffect } from 'react'

// COMPONENTS
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// STYLESHEETS
import { ButtonGroup, Button } from 'react-bootstrap'
import { AddNameFormContainer, AddNameTitle, AddNameForm, AddNameField, AddButton } from '../../styles/styledComponents/AddNameForm'
import { PageTitle } from '../../styles/styledComponents/PageTitle'
import { LikedNamesContainer, NameListItem, Num, Delete, OrderSaveBtn, Info } from '../../styles/styledComponents/NameLists'


const LikedNamesPage = () => {
  const [loading, setLoading] = useState(true)
  const [likedNames, setLikedNames] = useState([])
  const [newName, setNewName] = useState('')
  const [newGender, setNewGender] = useState('')

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
      await Promise.all(data.map(async (name) => {
        const baby_name = await (fetchNameFromID(name.name_id))
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
    if (!result.destination) return
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
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
      body: JSON.stringify({ customName: newName, gender: newGender })
    }
    try {
      const response = await fetch(`http://localhost:8000/users/add_name/`, init)
      const data = await response.json()
      window.location.reload()
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
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
      body: JSON.stringify({})
    }
    try {
      const response = await fetch(`http://localhost:8000/users/match_order/`, init)
      const data = await response.json()
      console.log(data)
    }
    catch (error) {
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
        body: JSON.stringify({ customName: e.target.value })
      }
      const saveRequest = await fetch(`http://localhost:8000/users/deletelikedname/`, init)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const MaleButton = {
    backgroundColor: '#ECCF8B',
    borderRadius: '10px 0 0 10px'
  }

  const FemaleButton = {
    backgroundColor: '#ECCF8B',
    borderRadius: '0 10px 10px 0'
  }


  if (loading) {
    return (
      <h1>loading</h1>
    )
  } else {
    return (
      <div>
        <AddNameFormContainer>
          <AddNameForm onSubmit={onSubmitNewName}>
            <AddNameTitle>add a new name :</AddNameTitle>
            <AddNameField
              placeholder='new name'
              name='newName'
              value={newName}
              required
              onChange={e => setNewName(e.target.value)}
            ></AddNameField>
            <ButtonGroup
              aria-label="Basic example"
              name='gender'
              onClick={e => setNewGender(e.target.value)}
            >
              <Button style={MaleButton} value='m' variant="secondary" className='male'>Male</Button>
              <Button style={FemaleButton} value='f' variant="secondary" className='female'>Female</Button>
            </ButtonGroup>
            <div />
            <AddButton type='submit'>add</AddButton>
            <div />
          </AddNameForm>
        </AddNameFormContainer>
        <PageTitle className='likes'>Your Liked Names</PageTitle>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='names'>
            {(provided) => (
              <LikedNamesContainer {...provided.droppableProps} ref={provided.innerRef}>
                {likedNames.map((name, index) => {
                  return (
                    <Draggable key={index} index={index} draggableId={index.toString()}>
                      {(provided) => (
                        <NameListItem
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className={`
                            ${(index === 0) ? 'first' : ''}
                            ${(index === 1) ? 'second' : ''}
                            ${(index === 2) ? 'third' : ''}
                            ${(index === 3) ? 'fourth' : ''}
                            ${(index === 4) ? 'fifth' : ''}
                          `}
                        >
                          <Num>{index + 1}.</Num> {name.baby_name}
                          <div>
                            <Info>i</Info>
                            <Delete value={name.baby_name} onClick={(e) => deleteName(e)}>x</Delete>
                          </div>
                        </NameListItem>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </LikedNamesContainer>
            )}
          </Droppable>
        </DragDropContext>
        <OrderSaveBtn variant='primary' onClick={() => saveNamesOrder(localStorage.getItem('user_id'))}>Save Order</OrderSaveBtn>
      </div >
    )
  }
}

export default LikedNamesPage
