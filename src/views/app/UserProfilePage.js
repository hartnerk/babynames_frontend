import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

// STYLES
import { PageTitle } from '../../styles/styledComponents/PageTitle'
import { ProfileLinkContainer, ProfileLinkCard, ProfileLink, ProfileCardLogo } from '../../styles/styledComponents/ProfileLinkCard';
import logo from '../../styles/resources/binkylogo.png'
import swipe from '../../styles/resources/swipelogo.png'
import info from '../../styles/resources/infologo.png'
import connect from '../../styles/resources/connectlogo.png'
import likes from '../../styles/resources/likelogo.png'
import prefs from '../../styles/resources/preflogo.png'


function UserProfilePage() {
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [CoupleId, setCoupleId] = useState();


  async function getUser() {
    try {
      let init = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
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
        <div>
          <PageTitle className='profile'>Hello, {localStorage.getItem('username')}.</PageTitle>
          <ProfileLinkContainer>
            <ProfileLink to='/preferences'>
              <ProfileLinkCard className='set-prefs'>
                Set<br />Preferences
            <ProfileCardLogo src={prefs} />
              </ProfileLinkCard>
            </ProfileLink>
            <ProfileLink to='/swiper'>
              <ProfileLinkCard className='swipe-names'>
                Swipe<br />Names
                <ProfileCardLogo src={swipe} />
              </ProfileLinkCard>
            </ProfileLink>
            <ProfileLink to='/liked-names'>
              <ProfileLinkCard className='liked-names'>
                Your Liked<br />Names
                <ProfileCardLogo src={likes} />
              </ProfileLinkCard>
            </ProfileLink>
            { localStorage.couple_id != 'undefined' ?
            <ProfileLink to='/matchpage'>
              <ProfileLinkCard className='matched-names'>
                Your Matched<br />Names
                <ProfileCardLogo src={connect} />
              </ProfileLinkCard>
            </ProfileLink>
            : ''
            } 
            <ProfileLink to='/recommendations'>
              <ProfileLinkCard className='rec-names'>
                Recommended<br />Names
                <ProfileCardLogo src={info} />
              </ProfileLinkCard>
            </ProfileLink>
          </ProfileLinkContainer>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage
