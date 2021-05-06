import React, { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import origins_list from './origins';

// CONTEXTS
//import { ProfileContext, useContext } from '../../../contexts/ProfileContext'

const PreferencesPage = () => {
  const [gender, setGender] = useState('Select Gender')
  const [origin, setOrigin] = useState('Select Origin')
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
        partnerUsername: partnerUser
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
          // setPartnerUser('wait for reponse')
          setCoupleId('based on partnerUser')
    } catch (error) {
        alert("Please enter a valid username")
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

  function renderOriginsDropdown() {
    return (
      <DropdownButton id="dropdown-basic-button" title={origin} onSelect={e => setOrigin(e)}>
          {origins_list.map((item, index) => (
            <Dropdown.Item key={index} eventKey={item}>{item}</Dropdown.Item>
          ))}    
      </DropdownButton>
    )
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
                  {renderOriginsDropdown()}
              </Form.Group>
              <Form.Group>
                <DropdownButton id="dropdown-basic-button" title={gender} onSelect={e => setGender(e)}>
                  <Dropdown.Item key="1" eventKey="M">M</Dropdown.Item>
                  <Dropdown.Item key="2" eventKey="F">F</Dropdown.Item>
                </DropdownButton>
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
