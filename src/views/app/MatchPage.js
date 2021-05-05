import React, {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';


const MatchPage = ({ isLoggedIn, user, handleLogout }) => {
  //const [matchList, setMatchList] = useState()

  async function getMatchName(){
    try {
      let init = {
        method:"GET",
        header:{
          "Content-Type": "Application/JSON",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      }
      console.log("matched list is called !!!! ")
      // let response = await fetch('http://localhost:8000/users/..couples.../coupleID')
      // setMatchList(response)
    } catch (error) {
      alert(error)
      
    }

  }
  useEffect(() => {
    if (localStorage.getItem('access_token') === null) {
      window.location.replace('http://localhost:3000/login');
    } else {
      getMatchName() 

    }
  }, []);

  let matchList = [ {"usercouple_id":usercouple_id, "name_id":name_id, "matched": matched}]

  return (
    <div>
      Couple Match Page
      
      {
        matchList.map((item) => <div> {item.name}</div>)
      }
    </div>
  );
};

export default MatchPage;

// I was planning to set it up as an api call that would return a list of matches. so you could hardcode something like matches=[1,3,4] and the numbers would be the name id's. Does that make sense?