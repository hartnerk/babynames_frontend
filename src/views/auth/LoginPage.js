import React, { useState, useEffect } from 'react'

// COMPONENTS
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'


function LoginPage () {
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
      email: email,
      password: password
    }

    try {
        let init = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          }
          console.log("FETCH USER LOGIN CALLED")
          let response = await fetch("http://localhost:3000/v1/users/auth/login/", init)
          if(response.key){
            localStorage.clear();
            localStorage.setItem('token', response.key);
            window.location.replace('http://localhost:3000/user-profile')
          } else {
            setEmail('')
            setPassword('')
            localStorage.clear()
            setErrors(true)
          }

        
    } catch (error) {
        alert(error)
    }


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
                        type='email'
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
