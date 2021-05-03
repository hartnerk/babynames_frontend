import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'


// COMPONENTS
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavDropdown } from 'react-bootstrap'

function TopNav() {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsAuth(true)
    }
  }, [])

  return (
    <Navbar>
      <Navbar.Brand>Baby Name Matcher</Navbar.Brand>
      <Navbar.Collapse>
        <Nav className="mr-auto">
        {isAuth === true ? (
          <Fragment>
            <NavDropdown title="Actions">
              <Link to='/user-profile'>Profile</Link>
              <Link to='/logout'>Logout</Link>
            </NavDropdown>
          </Fragment>
        ) : (
          <Fragment>
            <NavDropdown title="Actions">
              <NavDropdown.Item>
                <Link to='/login'>Login</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to='/signup'>Signup</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Fragment>
        )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}


export default TopNav
