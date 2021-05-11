import React, {useEffect, useState} from 'react'


// COMPONENTS
import ListGroup from 'react-bootstrap/ListGroup'
import {Modal, Button} from 'react-bootstrap'


// STYLES
import { DetailsForm } from '../styles/styledComponents/NameDetails'
import { AuthContainer } from '../styles/styledComponents/PreferencesPage'
import PopChart from './PopChart'


const loadData = require('../names_data_file.json')


function NameDetails({show, setShow, name}) {
    const [relatedNames, setRelatedNames] = useState()
    const [celebrityNames, setCelebrityNames] = useState()

    const nameStats = loadData.filter(x => x.name == name)


    const handleClose = () => setShow(false)

    async function getRelatedNames(){
        const response = await fetch(`https://www.behindthename.com/api/related.json?name=${name}&usage=eng&key=ja675945445`)
        const data = await response.json()
        console.log("Related names: ", data.names)
        setRelatedNames(data.names)
    }

    async function getCelebrityNames(){
        let init ={
            method: 'GET',
            headers: {
                "X-Api-Key": "RfT+DAREPh78QFxQa5FQng==yZoIzL6rB6goenMl"
            }
        }
        const response = await fetch(`https://api.celebrityninjas.com/v1/search?limit=10&name=${name}`, init)
        const data = await response.json()
        console.log("Celebrity names: ",data)
        setCelebrityNames(data)
    }

    useEffect(() => {
        getRelatedNames()
        getCelebrityNames()
       
    }, [name])

    return (

        <Modal show={show}>
        <Modal.Header >
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ListGroup>
                <ListGroup.Item>
                    <strong>Related Names: </strong>
                    <div>
                        {relatedNames && relatedNames.map((item, index) => <span>{(index ? ', ': '') + item}</span>)}
                    </div> 
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Celebrities with the name {name}:</strong>
                    <div>
                        {celebrityNames && celebrityNames.map((item, index) => <span>{(index ? ', ': '') + item.name}</span>)}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Popularity over the decades:</strong>
                    <div>
                        {show === true && <PopChart name_data={nameStats[0].data}/> }
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

    )
}

export default NameDetails
