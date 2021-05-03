import React, { useState, useEffect, Fragment } from 'react';

function UserProfilePage() {
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);


    async function getUser(){
        try {
            let init = {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Token ${localStorage.getItem('token')}`
                }
            }
            console.log("GETUSER IS CALLED")
            let response = await fetch('http://127.0.0.1:8000/api/v1/users/auth/user/', init)
            setUserEmail(response.email)
            setLoading(false)
            
        } catch (error) {
            alert(error)
        }
    }

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
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
          <h2>Hello {userEmail}!</h2>
        </Fragment>
      )}
    </div>
  );
};

export default UserProfilePage
