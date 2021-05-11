import React, { useState, useEffect } from 'react'

// COMPONENTS
import NameDetails from '../../components/NameDetails'


// STYLESHEETS
import { PageTitle } from '../../styles/styledComponents/PageTitle'
<<<<<<< HEAD
import { LikedNamesContainer, NameListItem, Info, Delete } from '../../styles/styledComponents/NameLists'
=======
import { LikedNamesContainer, NameListItem, Info } from '../../styles/styledComponents/NameLists'
>>>>>>> main

const MatchedNamePage = () => {
  const [loading, setLoading] = useState(true)
  const [matchedNames, setMatchedNames] = useState([])
  const [show, setShow] = useState(false)
  const [babyName, setBabyName] = useState()

  const handleShow = () => setShow(true)


  const fetchMatchedNameFromID = async (nameID) => {
    try {
      const response = await fetch(`http://localhost:8000/users/baby-names/${nameID}/`)
      const data = await response.json()
      return data
    } catch (error) {
      alert(error)
    }
  }

  const fetchMatchedNameObjs = async (usercoupleID) => {
    try {
      const response = await fetch(`http://localhost:8000/users/couples/${usercoupleID}/liked-names/?matched=True`)
      const data = await response.json()
      await Promise.all(data.map(async(name) => {
        const baby_name = await(fetchMatchedNameFromID(name.name_id))
        name['baby_name'] = baby_name.baby_name
      }))
      data.sort((a, b) => (a.order > b.order) ? 1 : -1)
      setMatchedNames(data)
      setLoading(false)
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    fetchMatchedNameObjs(localStorage.getItem('couple_id'))
    console.log("USE EFFECT")
  }, [])


  if(loading) {
    return (
      <h1>loading</h1>
    )
  } else if(matchedNames.length < 1) {
    return (
      <PageTitle className='likes'>You don't have any MATCHED names yet.</PageTitle>
    )
  } else {
    return(
      <div>
        <PageTitle className='likes'>Your Matched Names</PageTitle>
        <LikedNamesContainer>

          <NameDetails show={show} setShow={setShow} name={babyName}></NameDetails>

          {matchedNames.map((name, index) => {
            return (

              <NameListItem className='third'>
                <div/>
                {name.baby_name}
                <Info
                onClick={() => {
                  setBabyName(name.baby_name)
                  handleShow()
                }}
                >i</Info>
              </NameListItem>
            )
          })}
        </LikedNamesContainer>
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