import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

// CONTEXTS
import { ProfileContext } from '../../../contexts/ProfileContext'


const PreferencesPage = () => {
  const [gender, setGender] = useState('')
  const [origin, setOrigin] = useState('')
  const [partnerUser, setPartnerUser] = useState('')
  const [loading, setLoading] = useState(true) 
  const [errors, setErrors] = useState(false)
  const {user, setUser, coupleId, setCoupleId} = useContext(ProfileContext)

  useEffect(() => {
    if (localStorage.getItem('access_token') == null) {
      window.location.replace('http://localhost:3000/login')
      console.log(loading)
    }else {
      setLoading(false)
    }
  }, [])

  async function onSubmitUser(e) {
    e.preventDefault()
    const partnerObject = {
        partnerUserame: partnerUser
    }

    try {
        console.log(partnerObject)
        let init = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ localStorage.getItem('access_token'),
            }, 
            body:  JSON.stringify(partnerObject)
          }
          let response = await  fetch("http://localhost:8000/users/couples/", init)
          console.log('this is your response', response)
          let data = await response.json();
          console.log('this is your data', data)
          setPartnerUser('wait for reponse')
          setCoupleId('based on partnerUser')
    } catch (error) {
        alert(error)
    }
  }

  async function onSubmit(e) {
    e.preventDefault()
    const preferencesObject = {
        coupleId: coupleId,
        gender: gender,
        origin: origin,
    }

    try {
        console.log(preferencesObject)
        let init = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ localStorage.getItem('access_token')
            }, 
            body: JSON.stringify(preferencesObject)
          }
          let response = await  fetch("http://localhost:8000/users/preferences/", init)
          console.log('this is your response', response)
          let data = await response.json();
          console.log('this is your data', data) 
    } catch (error) {
        alert(error)
    }
  }

  return (
    <div>
      {loading === false && <h1>Name Preferences</h1>}
      {errors === true && <h2>Cannot log in with provided credentials</h2>}
      {loading === false && (
          <div>
          <Container>
            <Form onSubmit={onSubmitUser}>
                <Form.Group>
                        <Form.Label htmlFor='partnerUser'>Add your Partner:</Form.Label> <br />
                        <Form.Control
                            name='partnerUser'
                            type='text'
                            value={partnerUser}
                            required
                            onChange={e => setPartnerUser(e.target.value)}
                        />
                </Form.Group>
                <Button variant='primary' type='submit' >Add Partner</Button>
            </Form>
          </Container>
          <Container>
            <Form onSubmit={onSubmit}>
              {/* https://github.com/sickdyd/react-search-autocomplete maybey user later */}
              <Form.Group>
                  <Form.Label htmlFor='origin'>Origin:</Form.Label>
                  <Form.Control
                      name='origin'
                      type='text'
                      value={origin}
                      required
                      onChange={e => setOrigin(e.target.value)}
                  />
              </Form.Group>
              <Form.Group>
                  <Form.Label htmlFor='gender'>Gender:</Form.Label> <br />
                  <Form.Control
                      name='gender'
                      type='text'
                      value={gender}
                      required
                      onChange={e => setGender(e.target.value)}
                  />
              </Form.Group>
              <Button variant='primary' type='submit' >Set Preferences</Button>
            </Form>
          </Container>
        </div>
      )}
    </div>
  )
}

export default PreferencesPage
