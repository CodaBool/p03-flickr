import React, { useRef } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import FormControl from 'react-bootstrap/FormControl'
import NavLink from 'react-bootstrap/NavLink'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

export default function Navigation({ setTags }) {
  const search = useRef(null)

  function handleSearch(e) {
    e.preventDefault()
    const rawTags = search.current.value
    setTags(rawTags.replace(' ', ','))
  }

  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand className="mx-auto">
          <NavLink>Photos</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Form inline="true" className="ml-2" onSubmit={handleSearch} style={{width: '100%'}}>
            <Row style={{padding: 0, margin: 0}}>
              <Col>
                <FormControl type="text" placeholder="Search" ref={search} className="mr-auto" />
              </Col>
              <Col>
                <Button variant="outline-primary" onClick={handleSearch} className="ml-auto">Search</Button>
              </Col>
            </Row>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}