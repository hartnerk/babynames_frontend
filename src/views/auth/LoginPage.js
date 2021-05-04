import React, { useState, useEffect } from 'react'

// COMPONENTS
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'


function LoginPage ({history}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(true)
    
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      window.location.replace('http://localhost:3000/dashboard')
    } else {
      setLoading(false)
    }
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    const user = {
      username: email,
      password: password,
      grant_type: "password",
      client_id:'qpSs61fXHZJn6Z5VsY3lBTeTSe79DNiLoQHKQxak',
      client_secret:'7pOsDVjFYCqRMLNoWTTHBEkE5OixPOwYEeCdt2ztIM1xsvE7iZLSmCl1xsaEHLdgIsmJ5TY5YckjHumQnMiLiIX3HPvIRoE9i98mMOUGLywZd6IWblWbpAu2bwLcgvYD'
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
              'Content-Type': 'application/x-www-form-urlencoded'
            }, 
            body: formBody
          }
          console.log("FETCH USER LOGIN CALLED")
          let response = await  fetch("http://localhost:8000/auth/token/", init)
          console.log('this is your response', response)
          let data = await response.json();
          console.log('this is your data', data)
          if(data.access_token){
            localStorage.clear();
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
          } else {
            setEmail('')
            setPassword('')
            localStorage.clear()
            setErrors(true)
          }    
    } catch (error) {
        alert(error)
    }
    return history.push('/user-profile')
  }

  return (
    <div>
      {loading === false && <h1>Login</h1>}
      {errors === true && <h2>Cannot log in with provided credentials</h2>}
      {loading === false && (
        <Container>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label htmlFor='email'>Email address:</Form.Label>
                    <Form.Control
                        name='email'
                        type='text'
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='password'>Password:</Form.Label> <br />
                    <Form.Control
                        name='password'
                        type='password'
                        value={password}
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
            <Button variant='primary' type='submit' >Login</Button>
            </Form>
        </Container>
      )}
    </div>
  )
}


export default LoginPage
