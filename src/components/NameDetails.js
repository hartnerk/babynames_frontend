import React, {useEffect, useState} from 'react'


// COMPONENTS
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import {Modal, Button} from 'react-bootstrap'


// STYLES
import { DetailsForm } from '../styles/styledComponents/NameDetails'
import { AuthContainer } from '../styles/styledComponents/PreferencesPage'
import PopChart from './PopChart'


const prop = {"name": "Mary", "data": [{"decade": "1880", "occurrences": 92030, "rank": 1000}, {"decade": "1890", "occurrences": 131630, "rank": 1000}, {"decade": "1900", "occurrences": 162188, "rank": 1000}, {"decade": "1910", "occurrences": 480011, "rank": 1000}, {"decade": "1920", "occurrences": 704191, "rank": 1000}, {"decade": "1930", "occurrences": 576004, "rank": 970}, {"decade": "1940", "occurrences": 642343, "rank": 804}, {"decade": "1950", "occurrences": 627126, "rank": 741}, {"decade": "1960", "occurrences": 356573, "rank": 426}, {"decade": "1970", "occurrences": 126942, "rank": 178}, {"decade": "1980", "occurrences": 96467, "rank": 144}, {"decade": "1990", "occurrences": 75861, "rank": 163}, {"decade": "2000", "occurrences": 46263, "rank": 168}, {"decade": "2010", "occurrences": 25588, "rank": 131}]}
const name = "Mary"


function NameDetails({show, setShow}) {
    const [relatedNames, setRelatedNames] = useState()
    const [celebrityNames, setCelebrityNames] = useState()
  

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
       
    }, [])

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
                        <PopChart name_data={prop.data}/>
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
