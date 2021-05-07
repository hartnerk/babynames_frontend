import React, { useState, useEffect } from 'react'

// COMPONENTS
import Alert from 'react-bootstrap/Alert'

// STYLES
import { SwiperForm, SwiperFormTitle, SwiperFormFieldContainer, SwiperFormField, SwiperFormButton, SwiperRedirect, SwiperLink, FormLogo }
  from '../../styles/styledComponents/SwiperForm'
import { AuthContainer } from '../../styles/styledComponents/AuthContainer'


function SignupPage() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      window.location.replace('http://localhost:3000/user-profile')
    } else {
      setLoading(false)
    }
  }, [])

  async function onSubmit(e) {
    e.preventDefault()

    const user = {
      username: username,
      email: email,
      password: password,
    }

    try {

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
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      }
      console.log("FETCH REGISTER USER CALLED")
      let response = await fetch('http://127.0.0.1:8000/users/users/', init)
      if (response.ok) {
        alert("USER SIGNED UP")
      }
      window.location.replace('http://localhost:3000/login')
    } catch (error) {
      alert(error)
    }

  }

  return (
    <AuthContainer>
      { errors === true && <Alert variant="warning">Cannot signup with provided credentials</Alert>}
      <FormLogo>
        logo
      </FormLogo>
      <SwiperForm onSubmit={onSubmit}>
        <SwiperFormTitle>baby swiper</SwiperFormTitle>
        <SwiperFormFieldContainer>
          <SwiperFormField
            name='username'
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            placeholder='username'
          />
          <SwiperFormField
            name='email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder='email address'
          />
          <SwiperFormField
            name='password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder='password'
          />
          <SwiperFormButton type='submit'>Sign Up</SwiperFormButton>
          <SwiperRedirect>
            Already have an account?
            <br />
            Log in <SwiperLink className='swiper-link' to='/login'>here.</SwiperLink>
          </SwiperRedirect>
        </SwiperFormFieldContainer>
      </SwiperForm>
    </AuthContainer >
  )
}

export default SignupPage