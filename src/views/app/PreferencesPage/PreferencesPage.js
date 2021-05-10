import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import origins_list from './origins';

// STYLES
import { PrefFormNoteText, PrefForm, PrefDropdown, PrefDropdownButton, PrefFormTitle, PrefFormField, PrefFormButton, PrefLink }
  from '../../../styles/styledComponents/PreferencesForm'
import { AuthContainer } from '../../../styles/styledComponents/PreferencesPage'

const PreferencesPage = () => {
  const [gender, setGender] = useState('Select Gender')
  const [origin, setOrigin] = useState('Select Origin')
  const [partnerId, setPartnerId] = useState(false)
  const [partnerUser, setPartnerUser] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('access_token') == null) {
      window.location.replace('http://localhost:3000/login')
      console.log(loading)
    } else {
      setLoading(false)
      let partID = getPartner()
      setPartnerId(partID)
    }
  }, [loading])

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
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
        body: JSON.stringify(partnerObject)
      }
      let response = await fetch("http://localhost:8000/users/set_couples/", init)
      let data = await response.json();
      if (data == 'Please Enter a Valid Username') {
        alert(data)
      } else {
        localStorage.setItem('couple_id', data.id)
        await getPartner()
      }
    } catch (error) {
      alert(error)
    }
  }
  async function getPartner() {
    try {
      let init = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
      }
      let response = await fetch("http://localhost:8000/users/get_partner/", init)
      let data = await response.json();
      console.log('get partner id', data.id)
      localStorage.setItem('partnerId', data.id)
      setPartnerId(data.id)
    } catch (error) {
      if (loading === false)
        alert(error)
    }
  }

  async function onSubmit(e) {
    e.preventDefault()
    const preferencesObject = {
      gender: gender,
      origin: origin,
    }
    try {
      console.log(preferencesObject)
      // Set couple preferences
      let init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        body: JSON.stringify(preferencesObject)
      }
      await fetch("http://localhost:8000/users/set_preferences/", init)
      window.location.replace('http://localhost:3000/swiper')

      // Generate couple's name pool from couple preferences
      let init2 = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      }
      await fetch("http://localhost:8000/users/pref_names/", init2)


    } catch (error) {
      alert(error)
    }
  }

  function renderOriginsDropdown() {
    return (
      <PrefDropdownButton id="dropdown-basic-button" title={origin} onSelect={e => setOrigin(e)}>
        {origins_list.map((item, index) => (
          <PrefDropdown key={index} eventKey={item}>{item}</PrefDropdown>
        ))}
      </PrefDropdownButton>
    )
  }

  return (
    <div>
      {loading === true && <h1> Loading </h1>}
      {loading === false && (
        <div>
          {partnerId
            ?
            <AuthContainer>
              <PrefForm onSubmit={onSubmit}>
                <PrefFormTitle>Preferences</PrefFormTitle>
                <Form.Group>
                  {renderOriginsDropdown()}
                </Form.Group>
                <Form.Group>
                  <PrefDropdownButton id="dropdown-basic-button" title={gender} onSelect={e => setGender(e)}>
                    <PrefDropdown key="1" eventKey="M">M</PrefDropdown>
                    <PrefDropdown key="2" eventKey="F">F</PrefDropdown>
                  </PrefDropdownButton>
                </Form.Group>
                <PrefFormButton variant='primary' type='submit' >Update Preferences</PrefFormButton>
                <PrefFormNoteText>
                  Switch your baby swiping partner? &nbsp;
              <PrefLink value='false' onClick={e => setPartnerId(e.target.value)} className='Pref-link' to='/preferences'>here.</PrefLink>
                </PrefFormNoteText>
              </PrefForm>
            </AuthContainer>
            :
            <AuthContainer>
              <PrefForm onSubmit={onSubmitUser}>
                <PrefFormTitle>Preferences</PrefFormTitle>
                <Form.Group>
                  <Form.Label htmlFor='partnerUser'>Add your Partner:</Form.Label> <br />
                  <PrefFormField
                    name='partnerUser'
                    type='text'
                    value={partnerUser}
                    required
                    onChange={e => setPartnerUser(e.target.value)}
                  />
                </Form.Group>
                <PrefFormButton variant='primary' type='submit' >Update Partner</PrefFormButton>
              </PrefForm>
            </AuthContainer>
          }
        </div>
      )}
    </div>
  )
}

export default PreferencesPage
