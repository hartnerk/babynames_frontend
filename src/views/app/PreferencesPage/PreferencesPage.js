import React, { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import origins_list from './origins';

// CONTEXTS
import { ProfileContext } from '../../../contexts/ProfileContext'

const PreferencesPage = () => {
  const [gender, setGender] = useState('Select Gender')
  const [origin, setOrigin] = useState('Select Origin')
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
          // setPartnerUser('wait for reponse')
          setCoupleId('based on partnerUser')
    } catch (error) {
        alert("Please enter a valid username")
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
                <Button variant='primary' type='submit' >Add Partner</Button>
            </Form>
          </Container>
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
              <Button variant='primary' type='submit' >Set Preferences</Button>
            </Form>
          </Container>
        </div>
      )}
    </div>
  )
}

export default PreferencesPage
