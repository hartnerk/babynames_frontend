import React, { useState, useEffect } from 'react'

// COMPONENTS
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// STYLESHEETS
import { ListGroup } from 'react-bootstrap'

const MatchedNamePage = () => {
  const [loading, setLoading] = useState(true)
  const [matchedNames, setMatchedNames] = useState([])

  const fetchMatchedNameFromID = async (nameID) => {
    try {
      const response = await fetch(`http://localhost:8000/users/baby-names/${nameID}/`)
      const data = await response.json()
      return data
    } catch (error) {
      alert(error)
    }
  }

  const fetchMatchedNameObjs = async (userID) => {
    try {
      const response = await fetch('http://localhost:8000/users/couples/1/matched-names/?matched=True')
      const data = await response.json()
      await Promise.all(data.map(async(name) => {
        const baby_name = await(fetchMatchedNameFromID(name.name_id))
        name['baby_name'] = baby_name.baby_name
      }))
      setMatchedNames(data)
      setLoading(false)
    } catch (error) {
      alert(error)
    }
  }
  //console.log( baby_name)
  console.log(matchedNames, "!!!!!!!!matchedNames!!!!!!")
  // ** Hard coded couple ID assuming state/props is being passed from somewhere else in app
  useEffect(() => {
    fetchMatchedNameObjs(1)
  }, [])


  const handleOnDragEnd = (result) => {
    if(!result.destination) return
    const items = Array.from(matchedNames)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setMatchedNames(items)
  }

  if(loading) {
    return (
      <h1>loading</h1>
    )
  } else if(matchedNames.length < 1) {
    return (
      <h1>You don't have any MATCHED names yet.</h1>
    )
  } else {
    return(
      <div>
        <h1>Your Matched  Baby Names</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='names'>
            {(provided) => (
            <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                {matchedNames.map((name, index) => {
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
      </div>
    )
  }
}

export default MatchedNamePage



























































































// import React, {useState, useEffect}  from 'react';
// import { Link } from 'react-router-dom';
// import LikedNamePage from './LikedNamePage';

// const MatchPage = ({ isLoggedIn, handleLogout }) => {
//   const [matchList, setMatchList] = useState()

//   async function getMatchName(){
//     try {
//       let init = {
//         method:"GET",
//         header:{
//           "Content-Type": "Application/JSON",
//           "Authorization": `Bearer ${localStorage.getItem("access_token")}`
//         }
//       }
//       console.log("matched list is called !!!! ")
//       // let response = await fetch('http://localhost:8000/users/couples/coupleID')
//       // setMatchList(response)
//       let response = await fetch('http://localhost:8000/users/couples/1/liked-names/?matched=True')
//       console.log(response.json())
//     } catch (error) {
//       alert(error)
//     }

//   }
//   useEffect(() => {
//     if (localStorage.getItem('access_token') === null) {
//       window.location.replace('http://localhost:3000/login');
//     } else {
//       getMatchName() 

//     }
//   }, []);

//   //let matchList = [ {"usercouple_id":usercouple_id, "name_id":name_id, "matched": matched}]

//   return (
//     <div>
//       Couple Match Page
      
//       {
//         <div> This will be a list of matches  </div>//matchList.map((item) => <div> {item.name}</div>)
//       }
//     </div>
//   );
// };

// export default MatchPage;