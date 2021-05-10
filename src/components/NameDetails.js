import React, {useEffect} from 'react'


// COMPONENTS
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useState } from 'react'

// STYLES
import { DetailsForm } from '../styles/styledComponents/NameDetails'
import { AuthContainer } from '../styles/styledComponents/PreferencesPage'
import PopChart from './PopChart'


const loadData = require('../names_data_file.json')
const name = "Liam"
const nameStats = loadData.filter(x => x.name == name)


function NameDetailsPage() {
    const [relatedNames, setRelatedNames] = useState()
    const [celebrityNames, setCelebrityNames] = useState()

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
        <AuthContainer>
            <Card>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Card.Title>
                                {name}
                            </Card.Title>
                        </ListGroup.Item>
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
                                <PopChart name_data={nameStats[0].data}/>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </AuthContainer>
    )
}

export default NameDetailsPage
