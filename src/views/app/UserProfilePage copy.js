import React, { useState, useEffect, Fragment } from 'react';

function UserProfilePage() {
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [CoupleId, setCoupleId] = useState();


    async function getUser(){
        try {
          let init = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ localStorage.getItem('access_token'),
            }
          }
            console.log("GETUSER IS CALLED")
            // let response = await fetch('http://127.0.0.1:8000/api/v1/users/auth/user/', init)
            let response = await fetch(`http://localhost:8000/users/set_user`, init)
            const data = await response.json()
            // setUserEmail(response.email)
            localStorage.setItem('couple_id', data.id);
            localStorage.setItem('user_id', data.user_id);
            localStorage.setItem('username', data.username);
            setLoading(false)
            
        } catch (error) {
            alert(error)
        }
    }

  useEffect(() => {
    if (localStorage.getItem('access_token') === null) {
      window.location.replace('http://localhost:3000/login');
    } else {

        getUser()

    }
  }, []);

  return (
    <div>
      {loading === false && (
        <Fragment>
          <h1>User Profile</h1>
          <h2>Hello {localStorage.getItem('username')}!</h2>
        </Fragment>
      )}
    </div>
  );
};

export default UserProfilePage
