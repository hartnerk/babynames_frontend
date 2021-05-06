import React, { useState, useEffect } from 'react'

// COMPONENTS
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'


function LoginPage ({history}) {
  const [username, setUsername] = useState('')
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
      username: username,
      password: password,
      grant_type: "password",
      client_id:'xWILTFAezcV2kSPRe7Q4vaO0LIsX5TtLhrAjwwF2',
      client_secret:'KTc4oWUeSIEw2nkbewM1mcTq3uYOOgD1m9THfULxld7Kj3Yb0oXnJRIEwTozSG6soRdte50kSMEDqYVFAf7duEt5mnOO4Uik0572yCtRJjPvKcPdCaVon08WdkQkFn14'
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
          let response = await  fetch("http://localhost:8000/auth/token", init)
          console.log('this is your response', response)
          let data = await response.json();
          console.log('this is your data', data)
          if(data.access_token){
            localStorage.clear();
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
          } else {
            setUsername('')
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
                    <Form.Label htmlFor='email'>Username:</Form.Label>
                    <Form.Control
                        name='username'
                        type='text'
                        value={username}
                        required
                        onChange={e => setUsername(e.target.value)}
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
