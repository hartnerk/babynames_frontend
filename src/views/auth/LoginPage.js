import React, { useState, useEffect } from 'react'

// STYLES
import { AuthContainer } from '../../styles/styledComponents/AuthContainer'
import { SwiperForm, SwiperFormTitle, SwiperFormFieldContainer, SwiperFormField, FacbookFormButton, SwiperFormButton, SwiperRedirect, SwiperLink } from '../../styles/styledComponents/SwiperForm'
import { LoginPageContainer, LoginLeft, LeftText } from '../../styles/styledComponents/LoginPageContainers.js'
import logo from '../../styles/resources/binkylogo.png'
import ReactFacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login';


function LoginPage({ history }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      
    } else {
      setLoading(false)
    }
  }, [])

  async function  responseGoogle (response){
    console.log('google response: ', response);
    console.log('google token: ', response.accessToken)
    const facebookObject = {
      token: response.accessToken,
      backend: 'google-oauth2',
      grant_type : 'convert_token',
      client_id: '994524137851-u5f06ogiqjvbn8g8c1712vckd7vmkhfj.apps.googleusercontent.com',
      client_secret: 'iYnqv7sJ0lKPvSICRnd6q_go'
    }
    try {
      let init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(facebookObject)
      }
      let response = await fetch("http://localhost:8000/auth/convert-token", init)
      let data = await response.json();
      if (data.access_token) {
        localStorage.clear();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('name_index', 0);
      } else {
        setUsername('')
        setPassword('')
        localStorage.clear()
        setErrors(true)
      }
      window.location.replace('http://localhost:3000/user-profile/')
      if (data == 'Please Enter a Valid Username') {
        alert(data)
      } else {
        localStorage.setItem('couple_id', data.id)
        window.location.replace('http://localhost:3000/user-profile/')
      }
    } catch (error) {
      alert(error)
    }

  }

  async function responseFacebook(response){
    console.log('facebook response: ', response)
    console.log('facebook token: ', response.accessToken)
    const facebookObject = {
      token: response.accessToken,
      backend: 'facebook',
      grant_type : 'convert_token',
      client_id: 'EFxYCY1OrypZMyz6fXrwbqpJKsH1Lqu0wyk04p5Q',
      client_secret: 'fSlxzsT1wjZJrhv57EpdWnbbuIgwoWzeJMytkGwa41BuHhDJiwdZnBpKc1tlJfybIAko2OX65QRuN3G3V4U4kbThicRQgbx01QAOGdZ33UHKZXIzbFUXkeUUHh92sGSo'
    }
    try {
      let init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(facebookObject)
      }
      let response = await fetch("http://localhost:8000/auth/convert-token", init)
      let data = await response.json();
      if (data.access_token) {
        localStorage.clear();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('name_index', 0);
      } else {
        setUsername('')
        setPassword('')
        localStorage.clear()
        setErrors(true)
      }
      window.location.replace('http://localhost:3000/user-profile/')
      if (data == 'Please Enter a Valid Username') {
        alert(data)
      } else {
        localStorage.setItem('couple_id', data.id)
        window.location.replace('http://localhost:3000/user-profile/')
      }
    } catch (error) {
      alert(error)
    }
  }

  async function onSubmit(e) {
    e.preventDefault()
    const user = {
      username: username,
      password: password,
      grant_type: "password",
      client_id: 'EFxYCY1OrypZMyz6fXrwbqpJKsH1Lqu0wyk04p5Q',
      client_secret: 'fSlxzsT1wjZJrhv57EpdWnbbuIgwoWzeJMytkGwa41BuHhDJiwdZnBpKc1tlJfybIAko2OX65QRuN3G3V4U4kbThicRQgbx01QAOGdZ33UHKZXIzbFUXkeUUHh92sGSo'
    }

    try {
      console.log(user)
      var formBody = [];
      for (var property in user) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(user[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      let init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody
      }
      console.log("FETCH USER LOGIN CALLED")
      let response = await fetch("http://localhost:8000/auth/token", init)
      console.log('this is your response', response)
      let data = await response.json();
      console.log('this is your data', data)
      if (data.access_token) {
        localStorage.clear();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('name_index', 0);
      } else {
        setUsername('')
        setPassword('')
        localStorage.clear()
        setErrors(true)
      }
      window.location.replace('http://localhost:3000/user-profile/')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div>
      {errors === true && <h2>Cannot log in with provided credentials</h2>}
      {loading === false && (
        <AuthContainer>
          <LoginPageContainer>
            <div></div>
            <LoginLeft>
              <img src={logo} className='login-logo' />
              <LeftText>
                swipe.
                <br />
                like.
                <br />
                name.
              </LeftText>
            </LoginLeft>
            <SwiperForm onSubmit={onSubmit}>
              <SwiperFormTitle>baby swiper</SwiperFormTitle>
              <SwiperFormFieldContainer className='login-fields'>
                <SwiperFormField
                  name='username'
                  type='text'
                  value={username}
                  required
                  onChange={e => setUsername(e.target.value)}
                />
                <SwiperFormField
                  name='password'
                  type='password'
                  value={password}
                  required
                  onChange={e => setPassword(e.target.value)}
                />
                <SwiperFormButton type='submit' className='login-btn'>Log In</SwiperFormButton>
                <FacbookFormButton
                  cssClass="btn btn-default"
                  appId='468696767688433'
                  fields='name,username,picture'
                  callback={responseFacebook}
                />
                <GoogleLogin
                  clientId="994524137851-u5f06ogiqjvbn8g8c1712vckd7vmkhfj.apps.googleusercontent.com"
                  buttonText="Login"
                  callback={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />,
                <SwiperRedirect>
                  Don't have an account?
                  <br />
                  Sign up <SwiperLink className='swiper-link' to='/signup'>here.</SwiperLink>
                </SwiperRedirect>
              </SwiperFormFieldContainer>
            </SwiperForm>
            <div></div>
          </LoginPageContainer>
        </AuthContainer>
      )}
    </div>
  )
}


export default LoginPage
