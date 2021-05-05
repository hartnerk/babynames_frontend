import React, { useState, useEffect } from 'react'

// COMPONENTS
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// STYLESHEETS
import { ListGroup } from 'react-bootstrap'

const LikedNamePage = () => {
  const [loading, setLoading] = useState(true)
  const [likedNames, setLikedNames] = useState([])

  const getLikedNames = async (coupleID) => {
    try {
      let couplesNames = []
      //const response = await fetch(`http://localhost:8000/users/couples/${coupleID}/liked-names/`)
      const response = await fetch(`http://localhost:8000/users/liked-names/`)
      const data = await response.json()
      data.forEach((name) => {
        if (name.usercouple_id === coupleID) {
          couplesNames.push(name)
        }
      })
      setLikedNames(couplesNames)
      setLoading(false)
    } catch (error) {
      alert(error)
    }
  }

  // ** Hard coded couple ID assuming state/props is being passed from somewhere else in app
  useEffect(() => {
    getLikedNames(1)
  }, [])

  const handleOnDragEnd = (result) => {
    if(!result.destination) return
    const items = Array.from(likedNames)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setLikedNames(items)
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
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='names'>
            {(provided) => (
            <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                {likedNames.map((name, index) => {
                  // ** UPDATE WITH URL UPDATE
                  let baby_name = name.name_id
                  return (
                    <Draggable key={index} index={index} draggableId={index.toString()}>
                      {(provided) => (
                        <ListGroup.Item 
                          {...provided.draggableProps} 
                          {...provided.dragHandleProps} 
                          ref={provided.innerRef}
                        >
                          {index+1}: {baby_name}
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
      </div>
    )
  }
}

export default LikedNamePage
