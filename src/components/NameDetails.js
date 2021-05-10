import React, {useEffect} from 'react'


// COMPONENTS
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useState } from 'react'

// STYLES
import { DetailsForm } from '../styles/styledComponents/NameDetails'
import { AuthContainer } from '../styles/styledComponents/PreferencesPage'
import PopChart from './PopChart'


const name_data = [
    {"decade": "1880", "occurrences": 25512, "rank": 277}, 
    {"decade": "1890", "occurrences": 28763, "rank": 218}, 
    {"decade": "1900", "occurrences": 24268, "rank": 149}, 
    {"decade": "1910", "occurrences": 41963, "rank": 87}, 
    {"decade": "1920", "occurrences": 46729, "rank": 66}, 
    {"decade": "1930", "occurrences": 30228, "rank": 50}, 
    {"decade": "1940", "occurrences": 22901, "rank": 28}, 
    {"decade": "1950", "occurrences": 14656, "rank": 17}, 
    {"decade": "1960", "occurrences": 7004, "rank": 8}, 
    {"decade": "1970", "occurrences": 4682, "rank": 6}, 
    {"decade": "1980", "occurrences": 10439, "rank": 15}
]

function NameDetailsPage({name}) {
    const [relatedNames, setRelatedNames] = useState()
    const [celebrityNames, setCelebrityNames] = useState()
    // const name = "Michael"

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
                                <PopChart name_data={name_data}/>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </AuthContainer>
    )
}

export default NameDetailsPage
