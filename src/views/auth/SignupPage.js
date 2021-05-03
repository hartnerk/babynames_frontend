import React, { useState, useEffect } from 'react'

// COMPONENTS
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'


function SignupPage() {
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
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
      email: email,
      password1: password1,
      password2: password2
    }

    try {
        let init ={
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
        console.log("FETCH REGISTER USER CALLED")
        let response = await fetch('http://127.0.0.1:8000/api/v1/users/auth/register/', init)
        if (response.ok){
            alert("USER SIGNED UP")
        }

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
        <Form.Label htmlFor='password1'>Password:</Form.Label> <br />
        <Form.Control
          name='password1'
          type='password'
          value={password1}
          onChange={e => setPassword1(e.target.value)}
          required
        />
        </Form.Group>
        <Form.Group>
        <Form.Label htmlFor='password2'>Confirm password:</Form.Label>
        <Form.Control
          name='password2'
          type='password'
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          required
        />
        </Form.Group>
        <Button variant='primary' type='submit'>Sign Up</Button>
      </Form>
    </Container>
  )
}

export default SignupPage