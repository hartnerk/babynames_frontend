import React, {useEffect} from 'react'


// COMPONENTS
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useState } from 'react'



function NameDetailsPage() {
    const [relatedNames, setRelatedNames] = useState()
    const [celebrityNames, setCelebrityNames] = useState()
    const name = "Michael"

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
        <Container>
            <Card>
                <Card.Body>


                <ListGroup variant="flush">
                <ListGroup.Item>
                    <Card.Title>
                        {name}
                    </Card.Title>

                    <Card.Text>
                        Lorem Ipsum
                    </Card.Text>
                    </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Related Names: </strong>
                        <div>
                            {relatedNames && relatedNames.map((item, index) => <span>{(index ? ', ': '') + item}</span>)}
                        </div> 
                        </ListGroup.Item>
                        <ListGroup.Item><strong>Celebrities with the name {name}:</strong>
                            <div>
                            {celebrityNames && celebrityNames.map((item, index) => <span>{(index ? ', ': '') + item.name}</span>)}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Popularity over the decades:</strong>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default NameDetailsPage
