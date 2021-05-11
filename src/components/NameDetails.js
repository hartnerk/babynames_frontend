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
    const [nameStats, setNameStats] = useState()
    const [loading, setLoading] = useState(true)
    console.log("NAME DETAILS: ",name)


    const handleClose = () => setShow(false)


    async function getRelatedNames(){
        const response = await fetch(`https://www.behindthename.com/api/related.json?name=${name}&usage=eng&key=ja675945445`)
        const data = await response.json()
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
        setCelebrityNames(data)
        setLoading(false)
    }

    function getNameData(){
        console.log("GET NAME DATA CALLED")
        console.log("NAME IS ", name)
        let filterList = loadData.filter(x => x.name == name)
        if(filterList[0]){
            let nameData = filterList[0].data
            console.log("NAME DATA: ", nameData)
            setNameStats(nameData)
            console.log("GET NAME DATA: ",nameStats)
        } else {
            console.log("NO DATA WOMP")
        }

    }

    useEffect(() => {
        console.log("USE EFFECT CALLED WITH ", name)
        getNameData()
        getRelatedNames()
        getCelebrityNames()
    }, [show])

    return (
        <div>
            {loading == false && (
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
                        {nameStats && <PopChart name_data={nameStats}/>}
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      )}
      </div>
    )
}

export default NameDetails
