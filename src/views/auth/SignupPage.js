import React, { useState, useEffect } from 'react'

// COMPONENTS
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'


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

        let init ={
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }
        console.log("FETCH REGISTER USER CALLED")
        let response = await fetch('http://127.0.0.1:8000/users/users/', init)
        if (response.ok){
            alert("USER SIGNED UP")
        }
        window.location.replace('http://localhost:3000/login')
    } catch (error) {
        alert(error)
    }
      
  }

  return (
    <Container>
      {loading === false && <h2>Signup</h2>}
      {errors === true && <Alert variant="warning">Cannot signup with provided credentials</Alert>}
      <Form onSubmit={onSubmit}>

      <Form.Group>
        <Form.Label htmlFor='username'>Username:</Form.Label>
        <Form.Control
          name='username'
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        </Form.Group>
        <Form.Group>
            <Form.Label htmlFor='email'>Email address:</Form.Label>
            <Form.Control
            name='email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            />
        </Form.Group>
        <Form.Group>
        <Form.Label htmlFor='password'>Password:</Form.Label> <br />
        <Form.Control
          name='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        </Form.Group>
       
        <Button variant='primary' type='submit'>Sign Up</Button>
      </Form>
    </Container>
  )
}

export default SignupPage