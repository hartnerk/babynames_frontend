import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

// CONTEXTS
//import { ProfileContext, useContext } from '../../../contexts/ProfileContext'


const PreferencesPage = () => {
  const [gender, setGender] = useState('')
  const [origin, setOrigin] = useState('')
  const [coupleId, setCoupleId] = useState('')
  const [partnerUser, setPartnerUser] = useState('')
  const [loading, setLoading] = useState(true) 
  const [errors, setErrors] = useState(false)
  //const {user, setUser, coupleId, setCoupleId} = useContext(ProfileContext)

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
          let response = await  fetch("http://localhost:8000/users/set_couples/", init)
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
        usercouple_id: coupleId,
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
        let response = await fetch("http://localhost:8000/users/set_preferences/", init)
        console.log('this is your response', response)
        let data = await response.json();
        console.log('this is your pref data', data) 

        let init2 = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ localStorage.getItem('access_token')
            }
          }
        let name_pool_response = await fetch("http://localhost:8000/users/pref_names/", init2)
        console.log('this is your response', name_pool_response)
        let name_pool_data = await name_pool_response.json();
        console.log('this is your name pool', name_pool_data) 

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
                <Button variant='primary' type='submit' >Update Partner</Button>
            </Form>
          </Container>
          <br></br>
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
              <Button variant='primary' type='submit' >Update Preferences</Button>
            </Form>
          </Container>
        </div>
      )}
    </div>
  )
}

export default PreferencesPage
